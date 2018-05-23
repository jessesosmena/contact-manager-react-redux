import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import axios from 'axios';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as actions from '../src/actions/contact-actions';
import * as types from '../src/constants/action-types';
import ContactList from '../src/components/contact-list';
import ContactForm from '../src/components/contact-form';
import reducer from '../src/reducers/contact-reducer';
import ConnectedContactListPage, { ContactListPage }  from '../src/pages/contact-list-page';
import ConnectedContactFormPage, { ContactFormPage }  from '../src/pages/contact-form-page';
import App from '../src/App';

/*
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates GET_CONTACTS when fetching contacts has been done', () => {

    nock('http://127.0.0.1:8000')
      .get('/api/contacts')
      .reply(200, { payload: {  contacts: [{ first_name: 'shadow', last_name: 'madow', phone: 5566, email: 'shadow@yahoo.com' }] } });

    const expectedActions = [
      { type: types.GET_CONTACTS, payload: {  contacts: [{ first_name: 'shadow', last_name: 'madow', phone: 5566, email: 'shadow@yahoo.com' }] }}
    ];

    const store = mockStore({ contacts: [] });

    return store.dispatch(actions.getContacts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
*/



describe('Top Level App Component', () => {
  let app

  beforeEach(() => {
    app = shallow(<App/>)
  })

  it('+++ render the DUMB component', () => {
    expect(app.length).toEqual(1)
  });

  it('Should have a div with class name of well', () => {
    expect(app.find('.app').length).toEqual(1)
  })

  it('Should have a NavLink equal to 2', () => {
    const nav = app.find('NavLink');
    expect(nav.length).toEqual(2);
  })

  it('Should have a LoadingBar', () => {
    expect(app.find('LoadingBar').first()).toBeDefined;
  })

  it('Should have a Route equal to 3', () => {
    const route = app.find('Route');
    expect(route.length).toEqual(3);
  })

}) 


describe('ContactFormPage', () => {
  let cfp;

  const mockFormfn = jest.fn();

  beforeEach(() => {
    cfp = shallow(<ContactFormPage contact={mockFormfn} />);
  });

  it('+++ render the DUMB component', () => {
    expect(cfp.length).toEqual(1)
  });

  it('contact-form-page renders div', () => {
    expect(cfp.find('div').length).toEqual(1);
  });

  it('contact-form-page renders div', () => {
    expect(cfp.find('div').length).toEqual(1);
  });

  it('+++ contact Prop to be defined', () => {
     expect(cfp.prop('contact')).toBeDefined;
  });

  it('+++ onSubmit Function to be defined', () => {
     expect(cfp.prop('onSubmit')).toBeDefined;
  });

});

describe('ContactForm', () => {
  let cf;

  const mockFormfn = jest.fn();

  beforeEach(() => {
    cf = shallow(<ContactForm onSubmit={mockFormfn} />);
  });

  it('+++ render the DUMB component', () => {
    expect(cf.length).toEqual(1)
  });

  it('should call the mock onSubmit function', () => {
   cf.simulate('submit');
   expect(mockFormfn.mock.calls.length).toBe(1)
  })

});

describe('ContactListPage', () => {
  let clp;
  
  const contacts = 12;

  beforeEach(() => {
    clp = shallow(<ContactListPage contacts={contacts} />);
  });

  it('+++ render the DUMB component', () => {
    expect(clp.length).toEqual(1)
  });

  it('contact-list-page renders div', () => {
    expect(clp.find('div').length).toEqual(1);
  });

  it('Class of rendered div', () => {
    expect(clp.find('.contact_page').length).toEqual(1);
  });

  it('contact-list-page renders nested components', () => {
    expect(clp.find(ContactList).length).toEqual(1);
  });

  it('+++ contacts Prop to be defined', () => {
     expect(clp.find(ContactList).prop('contacts')).toBeDefined;
  });

  it('+++ deleteContact Function to be defined', () => {
     expect(clp.find(ContactList).prop('deleteContact')).toBeDefined;
  });

  it('+++ check Prop matches with initialState', () => {
     expect(clp.find(ContactList).prop('contacts')).toEqual(contacts)
  });

});

describe('>>>ConnectedContactFormPage --- REACT-REDUX (wrapping in <Provider>)',()=>{
    const initialState = {contact:15}
    const mockStore = configureMockStore()
    let store,form

    beforeEach(()=>{
        store = mockStore(initialState)
        form = shallow(<Provider store={store}><ConnectedContactFormPage /></Provider>)
    });

    it('+++ render the connectedContactFormPage(SMART) component', () => {
       expect(form.find(ConnectedContactFormPage).length).toEqual(1)
    });
});

describe('>>>ConnectedContactListPage --- REACT-REDUX (shallow + wrapping in <Provider>)',()=>{
    const initialState = {contacts:16}
    const mockStore = configureMockStore()
    let store,list

    beforeEach(()=>{
        store = mockStore(initialState)
        list = shallow(<Provider store={store}><ConnectedContactListPage /></Provider>)
    });

    it('+++ render the connectedContactListPage(SMART) component', () => {
       expect(list.find(ConnectedContactListPage).length).toEqual(1)
    });
});

describe('action', () => {
  it('should create an action to getContacts', () => {
    expect(actions.getContacts()).toBeDefined;
  })
});

describe('action', () => {
  let first_name, last_name, phone, email
  it('should create an action to saveContact', () => {
    expect(actions.saveContact({first_name, last_name, phone, email})).toBeDefined;
  })
});

describe('action', () => {
  let id
  it('should create an action to fetchContact', () => {
    expect(actions.fetchContact(id)).toBeDefined;
  })
});

describe('action', () => {
  let id, first_name, last_name, phone, email
  it('should create an action to updateContact', () => {
    expect(actions.updateContact({id, first_name, last_name, phone, email})).toBeDefined;
  })
});

describe('action', () => {
  let id
  it('should create an action to deleteContact', () => {
    expect(actions.deleteContact(id)).toBeDefined;
  })
});

describe('action', () => {
  let id
  it('should create an action to emptyContact', () => {
    expect(actions.emptyContact()).toBeDefined;
  })
});

const defaultState = {
  contacts: [],
  contact: {},
  errors: {}
};

describe('contact reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        ...defaultState
      }
    )
  }) 
})



































































