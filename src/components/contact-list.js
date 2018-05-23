import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export class ContactList extends Component {

    render() {
    	const { contacts, deleteContact } = this.props;
    	if(contacts){
		return (
		    <div>
		        {contacts.map(contact => (
		            <div key={Math.random()} style={{marginLeft:"65px"}} className="card well col-md-3 card-box">
					    <img style={{marginBottom: "5px"}} width="150px" src="profile/male-silhouette-cream.jpg" alt="default-avatar" />
					      <div className="card-body">
					        <div className="card-title">
					          <p>{contact.first_name} {contact.last_name}</p>
					        </div>
					        <div className="card-text">
					          <p>{contact.phone}</p>
					          <p>{contact.email}</p>
					        </div>
					      </div>
					      <div>
					        <div>
					          <Link to={'/contacts/edit/'+ contact.id} className="btn btn-warning">Edit</Link>
					          <button style={{marginLeft:"8px"}} className="btn btn-danger" onClick={() => deleteContact(contact.id)}>Delete</button>
					        </div>
					      </div>
					</div>
		        ))}
		    </div>
		)
	    }
    }
}

export default ContactList