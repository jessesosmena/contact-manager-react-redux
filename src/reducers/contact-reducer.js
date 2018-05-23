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

const defaultState = {
  contacts: [],
  contact: {},
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'GET_CONTACTS': {
      return {
        ...state,
        contacts: action.payload
      }
    }

    case 'SAVE_CONTACT_PENDING': {
      return {
        ...state
      }
    }

    case 'SAVE_CONTACT_FULFILLED': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        errors: {}
      }
    }

    case 'CONTACT_ERROR': {
      const errors = action.payload;

      return {
        ...state,
        errors: errors
      }
    }

    case 'FETCH_CONTACT_PENDING': {
      return {
        ...state,
        contact: {}
      }
    }

    case 'FETCH_CONTACT_FULFILLED': {
      return {
        ...state,
        contact: action.payload,
        errors: {}
      }
    }

    case 'UPDATE_CONTACT_PENDING': {
      return {
        ...state
      }
    }

    case 'UPDATE_CONTACT_FULFILLED': {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map(item => item.id === contact.id ? contact : item),
        errors: {}
      }
    }

    case 'UPDATE_CONTACT_REJECTED': {
      const errors = action.payload;
      return {
        ...state,
        errors: errors
      }
    }

    case 'DELETE_CONTACT_FULFILLED': {
      const id = action.payload;
      console.log(id)
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== id)
      }
    }

    case 'EMPTY_CONTACT': {
      return {
        ...state,
        contact: {}
      }
    }

    default:
      return state;
  }
}


