import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SubmissionError} from 'redux-form';
import {saveContact, fetchContact, updateContact, emptyContact} from '../actions/contact-actions';
import ContactForm from '../components/contact-form';



export class ContactFormPage extends Component {

  state = {
    redirect: false
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    if(id){
      this.props.fetchContact(id)
    } 
  }

  componentWillUnmount() {
    this.props.emptyContact()
  }

 
  submit = (contact) => {
      if(!contact.id) {
        this.props.saveContact(contact)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors)
        })
      } else {
        this.props.updateContact(contact)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
          throw new SubmissionError(this.props.errors)
        })
      }
  }

  render() {

    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/" /> :
          <ContactForm contact={this.props.contact} onSubmit={this.submit} />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contactStore.contact,
    errors: state.contactStore.errors
  }
}

export default connect(mapStateToProps, {saveContact, fetchContact, updateContact, emptyContact})(ContactFormPage);