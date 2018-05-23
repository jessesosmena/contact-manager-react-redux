import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLink, Route } from 'react-router-dom';
import ContactListPage from './pages/contact-list-page';
import ContactFormPage from './pages/contact-form-page';
import LoadingBar from 'react-redux-loading-bar';



class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <Router>
      <div className="app">
        <div className="well">
          <NavLink className="btn btn-info" activeClassName="active" exact to="/">
            Contacts List
          </NavLink>
          <NavLink style={{marginLeft: "9px"}} className="btn btn-info" activeClassName="active" exact to="/contacts/new">
            Add Contact
          </NavLink>
        </div>
        <LoadingBar style={{marginTop: "-20px"}} />
        <Route exact path="/" component={ContactListPage}/>
        <Route path="/contacts/new" component={ContactFormPage}/>
        <Route path="/contacts/edit/:id" component={ContactFormPage}/>
      </div>
    </Router>
    );
  }
}

export default App
