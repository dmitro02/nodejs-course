# nodejs-course

- `npm install`
- `npm start` - run Express Server on default port 3003 
- `npm run clean` - can be used to restore initial dataset
- `node src/httpsServer` - run custom HTTP Server on default port 8000

***

## Request examples

**Get all events:**
`curl http://localhost:3003/events`

**Get event by ID:**
`curl http://localhost:3003/events/3`

**Create event:**
```
curl --request POST 'http://localhost:3003/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"PE",
    "date":"2020-11-29",
    "time":"10:30",
    "location":"odessa",
    "creator_id":1
}'
```

**Update event:**
```
curl --request PUT 'http://localhost:3003/events/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "time":"12:45",
}'
```

**Delete event:**
`curl --request DELETE 'http://localhost:3003/events/1'`

**Create user:**
```
curl --request POST 'http://localhost:3003/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"testuser@some.net",
    "first_name":"Test",
    "last_name":"Peretest"
}'
```

**Delete user:**
`curl --request DELETE 'http://localhost:3003/users/5'`

**Invite user:**
`curl --request POST 'http://localhost:3003/participants?eventId=1&userId=1&userId=2&userId=3'`

***

## Request examples for custom HTTP Server

`curl http://localhost:8000/`

`curl http://localhost:8000/events`

`curl http://localhost:8000/events/1`

`curl http://localhost:8000/users`

`curl http://localhost:8000/users/1`

`curl http://localhost:8000/foo`

```
curl --request POST 'http://localhost:8000/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "event10"
}'
```

```
curl --request POST 'http://localhost:8000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "event10"
}'
```

### sequelize-auto for mysql and slite

`./node_modules/.bin/sequelize-auto -o "./models" -d calendar -h 34.89.206.41 -p 3306 -u root -x ***** -e mysql`

 `./node_modules/.bin/sequelize-auto -o "./models2" -h localhost -d calendar.sqlite -e sqlite -c ./sqlite-config.json`

sqlite-config.json content: `{ "storage":"./playground/calendar.sqlite" }`