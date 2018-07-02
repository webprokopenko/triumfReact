import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Eth from './containers/Eth/Eth';
import Btc from './containers/Btc/Btc';
import Bch from './containers/Bch/Bch';
import WrappTransaction from './containers/Transactions/WrappTransaction';
import Menu from './containers/Menu/Menu';
import LeftSide from './components/LeftSide/LeftSide';
import CenterSide from './components/CentralSide/CentralSide';
import RightSide from './components/RightSide/RightSide';
import './assets/css/fonts.css';
import './assets/css/main.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/eth" exact component={Eth} />
        <Route path="/btc" exact component={Btc} />
        <Route path="/bch" exact component={Bch} />
        <Route path="/left" exact component={LeftSide} />
        <Route path="/transactions" exact component={WrappTransaction} />
      </Switch>
    );
    let left = (
      <LeftSide>
        
      </LeftSide>
    )
    let center = (
      <CenterSide>

      </CenterSide>
    );
    let right = (
      <RightSide>

      </RightSide>
    );


    return (
       <div className="wrapp-all">
          {left}
          {center}
          {right}
        </div>      
    );
  }
}

export default App;
