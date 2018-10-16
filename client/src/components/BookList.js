import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`{
    books{
        name
        id
    }
}`

class BookList extends Component {

  displayBooks(){
    var data = this.props.data;
    if(data.loading){
        return(<div>Loading books...</div>);
    }
    const { books } = this.props.data; 
    return books.map(({id,name})=>
        (<li key={id}>{name}</li>)
    )
  }

  render() {
    
    return (
      <div className="main">
        <ul>
            { this.displayBooks() }           
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
