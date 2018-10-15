const express = require('express'); //require express server
const graphqlHTTP = require('express-graphql'); //use to handles graphql request
const schema = require('./schema/schema'); //get our schema
const mongoose = require('mongoose'); //get mongodb instance

 
const app = express(); //invoke the server function

//connect to mlab database
mongoose.connect('mongodb://ahmzyjazzy:support123@ds133353.mlab.com:33353/bookstore')
mongoose.connection.once('open', ()=>{
    //confirm connection
    console.log('connected to database');
})


//setup graphql endpoint middleware
app.use('/graphql', graphqlHTTP({
   schema,//schema tell express about our data and how they are structures
   graphiql: true //setting graphl to test api in a browser
}));

//server listen to port
app.listen(4000, ()=> {
    console.log('now listening for requests on port 4000');
});

/*
schema - define our obj in the gaphql query
mongoose schema - define obj in the real databsa
*/