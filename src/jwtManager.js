const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const logger = require('./logger')
const { 
    jwtExpiresIn, 
    jwtRefreshExpiresIn 
} = require('./config')

const privateKeyPath = '../test-ssl-keys/id_rsa'
const publicKeyPath = '../test-ssl-keys/id_rsa.pub.pem'

class JwtManager {
    constructor() {
        this.privateKey = this.getPrivateKey()
        this.publicKey = this.getPublicKey()
        this.revokedTokens = new Set()
        
        setInterval(this.cleanUpRevokedTokens.bind(this), 600000)
    }
    generateTokens() {
        return {
            accessToken: this.signJwt(this.privateKey, jwtExpiresIn),
            refreshToken: this.signJwt(this.privateKey, jwtRefreshExpiresIn, true)
        }
    }
    signJwt(privateKey, expiresIn, isRefresher) {
        return jwt.sign(
            { isRefresher: !!isRefresher }, 
            privateKey, 
            { 
                algorithm: 'RS256',
                expiresIn
            } 
        )
    }
    revokeToken(token) {
        this.revokedTokens.add(token)
    }
    isTokenValid(token) {
        try {
            const decoded = jwt.verify(token, this.publicKey)
            if (this.revokedTokens.has(token) || decoded.isRefresher) {
                return false
            }
            return true
        } catch(e) {
            logger.error(e)
            return false
        }
    }
    isRefreshTokenValid(token) {
        try {
            const decoded = jwt.verify(token, this.publicKey)
            if (this.revokedTokens.has(token) || !decoded.isRefresher) {
                return false
            }
            return true
        } catch(e) {
            logger.error(e)
            return false
        }
    }    
    refreshTokens(refreshToken) {
        if (this.isRefreshTokenValid(refreshToken)) {
            this.revokeToken(refreshToken)
            return this.generateTokens()
        }
        return null
    }
    cleanUpRevokedTokens() {
        this.revokedTokens.forEach((token) => {
            const decoded = jwt.decode(token)
            if (decoded.exp * 1000 < Date.now()) {
                this.revokedTokens.delete(token)
            }
        })
    }
    getPrivateKey() {
        return fs.readFileSync(path.join(__dirname, privateKeyPath))
    }
    getPublicKey() {
        return fs.readFileSync(path.join(__dirname, publicKeyPath))
    }
}

module.exports = JwtManager
