const mongoose = require('mongoose'); //get mongodb instance
const Schema = mongoose.Schema; //get a schema object to create schema

const bookSchema = new Schema({
    name:String,
    genre:String,
    authorId:String
});

module.exports = mongoose.model('Book', //collection name
                                bookSchema //collection schema definition
                                )