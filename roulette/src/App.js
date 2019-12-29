import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Redirect}
    from 'react-router-dom';

import Login from './components/login'
import Game from './components/Game'

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
              <Switch>
                  <Route exact={true} path='/' component={Login} />
                  <Route exact={true} path='/game' component={Game} />
              </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
