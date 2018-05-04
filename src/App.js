import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import logo from './assets/images/logo.svg';
import './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
      </Switch>
    );

    return (
      <div className="App">
        <header className="App-header">
        </header>
        <p className="App-intro">
          {routes}
        </p>
      </div>
    );
  }
}

export default App;
