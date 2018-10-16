import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries'

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
        var data = this.props.data;
        if(data.loading){
            return(<option disabled>Loading Authors</option>);
        }
        const { authors } = this.props.data; 
        return authors.map(({id,name})=>
            (<option key={id} value={id} > {name} </option>)
        )
    }

    onSubmitForm(e){
        e.preventDefault();
        console.log(this.state);
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

export default graphql(getAuthorsQuery)(AddBook);
