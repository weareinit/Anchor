import "./env";
import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router,Route} from 'react-router-dom';

import Landing from './pages/landing';
import hackers from './pages/hackers';
import Statistics from './pages/statistics'

class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path = "/" component={Landing} />
          <Route exact path = '/hackers' component={hackers} />
          <Route exact path = '/statistics' component = {Statistics} />
      </Router>
    );
  }
}

export default App;


/**
 New page for reminders, live page, form for push notifications
 */