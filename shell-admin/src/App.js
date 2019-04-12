import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Switch,BrowserRouter as Router,Route} from 'react-router-dom';

import Landing from './pages/landing';
import Dashboard from './pages/dashboard';

class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path = "/" component={Landing} />
          <Route exact path = '/dashboard' component={Dashboard} />
      </Router>
    );
  }
}

export default App;
