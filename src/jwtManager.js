const jwt = require('jsonwebtoken')
const fs = require('fs')
const logger = require('./logger')
const { 
    jwtExpiresIn, 
    jwtRefreshExpiresIn,
    privateKeyPath,
    publicKeyPath
} = require('./config')

class JwtManager {
    constructor() {
        this.privateKey = fs.readFileSync(privateKeyPath)
        this.publicKey = fs.readFileSync(publicKeyPath)
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
    isAccessTokenValid(token) {
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
}

module.exports = JwtManager
