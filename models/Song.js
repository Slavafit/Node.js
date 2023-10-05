const { Schema, model} = require('mongoose')

const Song = new Schema({
    artist: {type: String, required: true},   
    track: {type: String, required: true},
    year: {type: String },
    fileUrl: {type: String, required: true},
    coverUrl: {type: String },
    category: [{type: String }]
})

module.exports = model('Song', Song)