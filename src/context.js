import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
      case 'UPDATE_CONTACT':
          return{
              ...state,
              contacts:state.contacts.map(
                  contact=>contact.id===action.payload.id?
                (contact=action.payload):contact)
          };
    default:
      return state;
  }
};

//context.js holds our application level state

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
      //we create provider that is givin off this value, that holds the state. Here we can chose how much peaces of state we want to put in
    );
  }
}

export const Consumer = Context.Consumer;
