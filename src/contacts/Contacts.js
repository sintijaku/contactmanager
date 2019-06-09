import React, { Component } from 'react'
import Contact from './Contact';
import {Consumer} from '../../context'

 class Contacts extends Component {
//any component we want to use the context with we bring in the consumer

    render() {
return (
    <Consumer>
        {/* ew return Consumer tag which gives us value that contains anything we passed in it*/}
        {value=>{
            const {contacts}=value; //use destructuring (pull out Contacts from Contacts state)
            return(    <React.Fragment>//we want to return component
                {contacts.map(contact=>
                    (<Contact key={contact.id} 
                        contact={contact} />)
                )}
            </React.Fragment> );
        }}
    </Consumer>
);
    }
}

export default Contacts;