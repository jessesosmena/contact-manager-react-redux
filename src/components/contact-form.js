import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';


const renderField = ({input, type, label, meta:{error, touched}}) => (
  <div>
    <label>{label}</label>
    <input {...input} className="form-control" type={type} placeholder={label}/>
    {touched && error && 
     <span className="text-danger">{error.message}</span>
    }
  </div>
)

const validate = (values) => {

  const errors = {name:{}};

  if(!values.first_name) {
    errors.first_name = {
      message: 'You need to provide First Name'
    }
  } else if(!values.last_name) {
    errors.last_name = {
      message: 'You need to provide Last Name'
    }
  }

  if(!values.phone) {
    errors.phone = {
      message: 'You need to provide a Phone number'
    }
  } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.phone)) {
    errors.phone = {
      message: 'Phone number must be in International format'
    }
  }

  if(!values.email) {
    errors.email = {
      message: 'You need to provide an Email address'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address'
    }
  }

  return errors;
}



export class ContactForm extends Component {

  componentWillReceiveProps = (nextProps) => { 
    const { contact } = nextProps;
    if(contact.id !== this.props.contact.id){
       this.props.initialize(contact)
    }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="container">
        <div className="row">
          <h1 style={{marginTop:"1em"}}>{this.props.contact.id ? 'Edit Contact' : 'Add New Contact'}</h1>
          <form id="loginForm" onSubmit={handleSubmit}>
           
            <Field name="first_name" type="text" component={renderField} label="First Name"/>
            <Field name="last_name" type="text" component={renderField} label="Last Name"/>
          
            <Field name="phone" type="text" component={renderField} label="Phone"/>
            <Field name="email" type="text" component={renderField} label="Email"/><br />

            <button className="btn btn-info" type='submit' disabled={pristine || submitting}>Save</button>

          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({form: 'contact', validate})(ContactForm);