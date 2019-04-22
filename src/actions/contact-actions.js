import { 
  GET_CONTACTS,
  CONTACT_ERROR, 
  SAVE_CONTACT_PENDING,
  SAVE_CONTACT_FULFILLED,  
  FETCH_CONTACT_FULFILLED,
  UPDATE_CONTACT_REJECTED,
  UPDATE_CONTACT_FULFILLED,
  DELETE_CONTACT_FULFILLED,
  EMPTY_CONTACT,
} from '../constants/action-types';

import { SubmissionError } from 'redux-form';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function getContacts() {
  return function(dispatch) {
   
    return axios.get('http://127.0.0.1:8000/api/contacts', { 
    })
      .then((response) => {
        dispatch({type: 'GET_CONTACTS', payload: response.data})
        dispatch(hideLoading())
      })
      .catch((error) => {
        dispatch({type:  'CONTACT_ERROR', payload: error})
    })
  }
}

export function saveContact({first_name, last_name, phone, email}) {
  return function(dispatch) {
    dispatch(showLoading())
    dispatch({type: 'SAVE_CONTACT_PENDING'})
    return axios.post('http://127.0.0.1:8000/api/contacts', {first_name, last_name, phone, email})
      .then((response) => {
        dispatch({type: 'SAVE_CONTACT_FULFILLED', payload: response.data})
        this.getContacts()
      })
      .catch((error) => {
        dispatch({type:  'CONTACT_ERROR', payload: error})
    })
  }
}

export function fetchContact(id) {
   return function(dispatch) {
    
    axios.get('http://127.0.0.1:8000/api/contacts/' + id, {})
      .then((response) => {
        dispatch({type: 'FETCH_CONTACT_FULFILLED', payload: response.data})
      })
      .catch((error) => {
        dispatch({type:  'UPDATE_CONTACT_REJECTED', payload: error})
    })
  }
}

export function updateContact({id, first_name, last_name, phone, email}) {
    return function(dispatch) {
    dispatch(showLoading())
    return axios.put('http://127.0.0.1:8000/api/contacts/' + id, {first_name, last_name, phone, email})
      .then((response) => {
        dispatch({type: 'UPDATE_CONTACT_FULFILLED', payload: response.data})
      })
      .catch((error) => {
        dispatch({type:  'UPDATE_CONTACT_REJECTED', payload: error})
    })
  }
}

export function deleteContact(id) {
   return function(dispatch) {
    dispatch(showLoading())
    return axios.delete('http://127.0.0.1:8000/api/contacts/' + id, {})
      .then((response) => {
        dispatch({type: 'DELETE_CONTACT_FULFILLED', payload: response.data})
      })
      .catch((error) => {
        dispatch({type:  'CONTACT_ERROR', payload: error})
    })
  }
}

export function emptyContact() {  
    return function(dispatch) {
       return dispatch({type: 'EMPTY_CONTACT'})
    }
}