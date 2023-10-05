const { Schema, model} = require('mongoose')

const Category = new Schema({
    //значения полей: строка, уникальный или нет, значение по умолчанию
    value: {type: String, unique: true, default: "OTHER"},   
})

module.exports = model('Category', Category)

