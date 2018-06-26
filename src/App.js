import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Eth from './containers/Eth/Eth';
import Btc from './containers/Btc/Btc';
import Bch from './containers/Bch/Bch';
import WrappTransaction from './containers/Transactions/WrappTransaction';
import Menu from './containers/Menu/Menu';
import './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/eth" exact component={Eth} />
        <Route path="/btc" exact component={Btc} />
        <Rlute path="/bch" exact component={Bch} />
        <Route path="/transactions" exact component={WrappTransaction} />
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
