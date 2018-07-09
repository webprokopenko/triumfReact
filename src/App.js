import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsApi from './services/Stats/StatsApi';

import LeftSide from './containers/LeftSide/LeftSide';
import CenterSide from './containers/CentralSide/CentralSide';
import RightSide from './containers/RightSide/RightSide';
import WindowSendTransaction from './components/UI/SendTransaction/SendTransaction';
import WindowTransactions from './containers/Transactions/Transactions'
import WindowAccount from './containers/Account/Account';

import './assets/css/fonts.css';
import './assets/css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      rightWindow: null,
    };
    this.curr = {
      'eth': {
        'usd': '...',
        'eur': '...',
      },
      'btc': {
        'usd': '...',
        'eur': '...',
      },
      'bch': {
        'usd': '...',
        'eur': '...',
      },
      'btg': {
        'usd': '...',
        'eur': '...',
      },
      'ltc': {
        'usd': '...',
        'eur': '...',
      },
    }
    this.getHotCourse()
  }

  async getHotCourse(blockchain, currency) {
    let ethUsd = await StatsApi.getHotEthUSD();
    this.curr.eth.usd = ethUsd;
    this.props.setCurr(this.curr);
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
        {left}
        {center}
        {right}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      curr: state.curr
  }
}
const mapDispatchToProps = dispatch => {
  return {
      setCurr: (curr) => dispatch({ type: 'SET_CURR', curr: curr })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App); 
