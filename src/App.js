import React, { Component } from 'react';

import LeftSide from './containers/LeftSide/LeftSide';
import CenterSide from './containers/CentralSide/CentralSide';
import RightSide from './containers/RightSide/RightSide';
import WindowSendTransaction from './components/UI/SendTransaction/SendTransaction';
import WindowTransactions from './containers/Transactions/Transactions'
import WindowAccount from './containers/Account/Account';
import Starts from './services/Stats/Stats';
import './assets/css/fonts.css';
import './assets/css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      rightWindow: null,
    };
  }
  createWallet = (e) => {
    e.preventDefault();
    this.setState({ rightWindow: <WindowAccount /> });
  }
  sendTransaction = (e, id) => {
    e.preventDefault();
    this.setState({ rightWindow: <WindowSendTransaction id={id} /> })
  }
  transactionsHistory = (e, id) => {
    e.preventDefault();
    this.setState({ rightWindow: <WindowTransactions id={id} showSendTransaction={this.sendTransaction} /> })
  }
  render() {
    let left = (
      <LeftSide>

      </LeftSide>
    )
    let center = (
      <CenterSide createWallet={this.createWallet} sendTransaction={this.sendTransaction} transactionsHistory={this.transactionsHistory}>

      </CenterSide>
    );
    let right = (
      <RightSide window={this.state.rightWindow}>

      </RightSide>
    );
    return (
      <div className="wrapp-all">
        <Starts/>
        {left}
        {center}
        {right}
      </div>
    );
  }
}
export default App; 
