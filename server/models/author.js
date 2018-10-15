const mongoose = require('mongoose'); //get mongodb instance
const Schema = mongoose.Schema; //get a schema object to create schema

const authorSchema = new Schema({
    name:String,
    age:Number
});

module.exports = mongoose.model('Author', //collection name
                                authorSchema //collection schema definition
                                )