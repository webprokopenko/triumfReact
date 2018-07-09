import React, { Component } from 'react';
import { connect } from 'react-redux';

import  StatsApi  from './StatsApi';

class Stats extends Component{
    constructor(props){
        super(props)
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
    render(){
        return (<div></div>);
    }
}
const mapStateToProps = state => {
    return {
        curr: state.curr.curr
    }
}
  const mapDispatchToProps = dispatch => {
    return {
        setCurr: (curr) => dispatch({ type: 'SET_CURR', curr: curr })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Stats); 