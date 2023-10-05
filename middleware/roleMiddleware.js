const jwt = require('jsonwebtoken');
const {secret} = require('../config')
module.exports = function (roles) {             //передаем массив ролей!!!
    return function (req, res, next) {
        if (req.method === "OPTIONS") {     //исключаем метод запросов OPTIONS
            next()
        }
        try {
            //извлекаю токен из заголовков, делим строку на 2 части и берем вторую часть [1]
            const token = req.headers.authorization.split(' ')[1]
                if (!token) {       //если токена нэма  
                return res.status(403).json({message: "User is not authorized"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)    //меняем имя на userRoles
            let hasRole = false     //по умолчанию
            userRoles.forEach(role => {     //проверка, есть ли в списке ролей те роли, которые разрешены для этой функции
                if (roles.includes(role))   //если массив roles содержит в себе роль, которая есть у пользователя
                hasRole = true      //то меняем на тру
            });
            if (!hasRole) {         //если роль не разрешена возврат клиенту
                return res.status(403).json({message: "You don't have access"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User is not authorized"})
        }
    }
}