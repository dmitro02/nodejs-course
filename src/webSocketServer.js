const WebSocketServer = require('websocket').server
const http = require('http')
const static = require('node-static')
const fs = require('fs')
const { nanoid } = require('nanoid')
const FileType = require('file-type')

const fileServer = new static.Server('./public', { indexFile: "index.html" })

const feHttpServer = http.createServer((request, response) => {
    request.addListener('end', () => {
        fileServer.serve(request, response, (err, result) => {
            if (err) {
                console.error(err)
                response.writeHead(err.status, err.headers)
                response.end()
            }
        });
    }).resume()
})
feHttpServer.listen(8081, () => {
    console.log('Frontend server is listening on port 8081')
})

const beHttpsServer = http.createServer((request, response) => {
    response.writeHead(404)
    response.end()
})
beHttpsServer.listen(8080, () => {
    console.log('Backend server is listening on port 8080')
})

const wsServer = new WebSocketServer({
    httpServer: beHttpsServer,
    autoAcceptConnections: true,
    maxReceivedFrameSize: 1048576
})

const connectionPool = new Set()

wsServer.on('connect', (connection) => { 
    console.log('Connection established')

    connectionPool.add(connection)

    connection.on('message', async (msg) => { 
        if (msg.type === 'utf8') {
            console.log('Received message: ' + msg.utf8Data)
            connection.send(msg.utf8Data)
        }
        else if (msg.type === 'binary') {
            const data = msg.binaryData

            console.log(`Received binary data of ${data.length} bytes`)

            const fileType = await FileType.fromBuffer(data)
            const ext = fileType ? fileType.ext : 'txt'
            const fileName = `${nanoid()}.${ext}`

            fs.writeFileSync(`./public/${fileName}`, data)

            connectionPool.forEach((con) => {
                con.send(`http://localhost:8081/${fileName}`)
            })
        } 
    })

    connection.on('error', (err) => { console.error(err.message) })

    connection.on('close', (reasonCode, description) => { 
        connectionPool.delete(connection)
        console.log('Connection closed.', reasonCode, description) 
    })
})
