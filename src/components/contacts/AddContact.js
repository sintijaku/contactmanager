import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";
import axios from 'axios';

class AddContact extends Component {
  state = {
    //create state
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //Check for errors (validation)
    if (name === '') {
      this.setState({ errors: { name: "Name is required" } });
      return; //we are setting the state but this will stop it
    }
    if (email === '') {
      this.setState({ errors: { email: "Email is required" } });
    return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: "Phone is required" } });
    return;
    }

    const newContact = {
    //   id: uuid(), //this generates new, unique id
      name,
      email,
      phone
    };

    const res=await axios
    .post('https://jsonplaceholder.typicode.com/users', newContact)
    dispatch({ type: "ADD_CONTACT", 
    payload: res.data })

    //cleares state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push('/'); //redirecting to main page after contact is added
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                {/* creating form */}
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-black"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
