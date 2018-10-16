import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries'

//components
import BookDetails from './BookDetails';

class BookList extends Component {

  constructor(props){
      super(props);
      this.state = {
          selected: null
      }
  }

  displayBooks(){
    var data = this.props.data;
    if(data.loading){
        return(<div>Loading books...</div>);
    }
    const { books } = this.props.data; 
    return books.map(({id,name})=>
        (<li key={id} onClick={ (e)=> { this.setState({selected: id}) }}>{name}</li>)
    )
  }

  render() {
    
    return (
      <div className="main">
        <ul>
            { this.displayBooks() }           
        </ul>
        <BookDetails bookId={ this.state.selected } />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
