const jwt = require('jsonwebtoken');
const {secret} = require('../config')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        //извлекаю токен из заголовков, делим строку на 2 части и берем вторую часть [1]
        const token = req.headers.authorization.split(' ')[1]
            if (!token) {       //если нет токена
            return res.status(403).json({message: "User is not authorized"})
        }
        const decodedData = jwt.verify(token, secret)   //здесь лежит объект payload (id, roles)  пользователя
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "User is not authorized"})
    }
}