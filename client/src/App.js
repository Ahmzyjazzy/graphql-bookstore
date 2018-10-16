import React, { Component } from 'react';

//apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; //bind apollo to react i.e help react understand what apollo is doing


//components
import BookList from './components/BookList';

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="main">
          <h1>My Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
