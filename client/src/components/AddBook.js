import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            genre:'',
            authorId: ''
        }
    }

    displayAuthors(){
        var data = this.props.getAuthorsQuery; //named given

        if(data.loading){
            return(<option disabled>Loading Authors</option>);
        }
        const { authors } = this.props.getAuthorsQuery; 
        return authors.map(({id,name})=>
            (<option key={id} value={id} > {name} </option>)
        )
    }

    onSubmitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            //refetching query to update the ui
            refetchQueries: [{ query: getBooksQuery }]
        });        
    }

  render() {
    
    return (
      <form id="add_book" onSubmit={ this.onSubmitForm.bind(this) }>

          <div className="field">
              <label>Book name:</label>
              <input type="text" placeholder="Book" onChange={ (e) => this.setState({ name: e.target.value })} />
          </div>

          <div className="field">
              <label>Genre:</label>
              <input type="text" placeholder="Genre" onChange={ (e) => this.setState({ genre: e.target.value })} />
          </div>

          <div className="field">
              <label>Author:</label>
              <select onChange={ (e) => this.setState({ authorId: e.target.value })}>
                <option>Select Authors</option>
                {this.displayAuthors()}
              </select>
          </div>

          <button>+</button>

      </form>
    );
  }
}

export default compose(
    //binding multiple queries to one component
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook);
