import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Eth from './containers/Eth/Eth';
import Btc from './containers/Btc/Btc';
import Bch from './containers/Bch/Bch';
import WrappTransaction from './containers/Transactions/WrappTransaction';
import Menu from './containers/Menu/Menu';
import LeftSide from './containers/LeftSide/LeftSide';
import CenterSide from './containers/CentralSide/CentralSide';
import RightSide from './containers/RightSide/RightSide';
import WindowSendTransaction from './components/UI/SendTransaction/SendTransaction';
import WindowAccount from './components/UI/Account/Account';
import './assets/css/fonts.css';
import './assets/css/main.css';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      transactions:[],
      rightWindow:null,
      wallets:[]
    };
  }
  componentWillUpdate(){
    console.log('Component App Will Update: ');
    console.log(this.state.wallets);
  }
  createWallet = (e) => {
	  e.preventDefault();
    this.setState({rightWindow:<WindowAccount />});
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/eth" exact component={Eth} />
        <Route path="/btc" exact component={Btc} />
        <Route path="/bch" exact component={Bch} />
        <Route path="/transactions" exact component={WrappTransaction} />
      </Switch>
    );
    let left = (
      <LeftSide>
        
      </LeftSide>
    )
    let center = (
      <CenterSide createWallet={this.createWallet}>

      </CenterSide>
    );
    let right = (
      <RightSide window={this.state.rightWindow}>

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
