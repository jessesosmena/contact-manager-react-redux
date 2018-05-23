import { combineReducers } from 'redux';
import ContactReducer from './contact-reducer';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
  contactStore: ContactReducer,
  form: formReducer,
  loadingBar: loadingBarReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;