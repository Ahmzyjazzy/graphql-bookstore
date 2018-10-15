const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')

const {
    GraphQLObjectType, //to define schema object type 
    GraphQLString, //specify string datatype
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql;

// //dummy db
// var books = [
//     {name: 'Name of Wind', genre:'Fantasy',id:'1', authorId:'1'},
//     {name: 'The Final Empire', genre:'Fantasy',id:'2',authorId:'2'},
//     {name: 'The Long Earth', genre:'Sci-Fi',id:'3',authorId:'3'}
// ];

// var authors = [
//     {name: 'Patrick Rothfuss', age:44, id:'1'},
//     {name: 'Brandson Sanderson', age:42, id:'2'},
//     {name: 'Terry Prachett', age:66, id:'3'}
// ];


//book type definition
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ //to specify each column e.g id, name etc
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{ //sample relationship
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                // return _.find(authors, {id:parent.authorId});
                return Author.findById(parent.authorId)
;            }
        }
    })
});

//author type definition
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({ //to specify each column e.g id, name etc
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type:new GraphQLList(BookType),
            resolve(parent){
                // return _.filter(books,{authorId:parent.id})
                return Book.find({ authorId:parent.id });
            }
        }
    })
});

//define how query can be read from schema
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type:GraphQLID}}, //arguments or fields we want to query in the schema/table
            resolve(parent,args){ //code to get data from our db/other source
                // return _.find(books, {id:args.id});
                return Book.findById(args.id);
            } 
        },
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors, {id:args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({}); //emty object makes it return all
            }
        },
        authors: {
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)}, 
                age:{type:GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save(); //save directly to the mongoose db online
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)}, 
                genre:{type:GraphQLNonNull(GraphQLString)},
                authorId:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save(); //save directly to the mongoose db online
            }
        },
    }
})

//export all our query
module.exports = new GraphQLSchema({
    //pass initial root query/read query
    query: RootQuery,
    mutation:Mutation
})