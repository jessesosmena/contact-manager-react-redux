import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { getContacts, deleteContact } from '../actions/contact-actions';
import ContactList from '../components/contact-list';
import PropTypes from 'prop-types';


export class ContactListPage extends Component {

  delete_contact = (id) => {
    this.props.deleteContact(id)
    .then(response => this.props.getContacts())
    .catch(err => {
      throw new SubmissionError(this.props.errors)
    })
  }

  componentDidMount() {
    this.props.getContacts()
  }

  render() {
    return (
        <div className="contact_page">
          <ContactList contacts={this.props.contacts} deleteContact={this.delete_contact} />
        </div>
    )
  }
}

// Make contacts array available in props
function mapStateToProps(state) {
  return {
      contacts: state.contactStore.contacts
  }
}

export default connect(mapStateToProps, {getContacts, deleteContact})(ContactListPage);