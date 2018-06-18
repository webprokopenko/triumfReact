import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Eth from './containers/Eth/Eth';
import Menu from './containers/Menu/Menu';
import './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/eth" exact component={Eth} />
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
