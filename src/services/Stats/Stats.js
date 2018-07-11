import React, { Component } from 'react';
import { connect } from 'react-redux';

import  StatsApi  from './StatsApi';

class Stats extends Component{
    constructor(props){
        super(props)
        this.curr = this.props.curr;
          this.getHotCourse()
    }
    async getHotCourse() {
        let ethUsd = await StatsApi.getHotEthUSD();
        let btcUsd = await StatsApi.getHotBtcUSD();
        let btgUsd = await StatsApi.getHotBtgUSD();
        let ltcUsd = await StatsApi.getHotLtcUSD();
        let bchUsd = await StatsApi.getHotBchUSD();

        this.curr.eth.usd = ethUsd;
        this.curr.btc.usd = btcUsd;
        this.curr.btg.usd = btgUsd;
        this.curr.ltc.usd = ltcUsd;
        this.curr.bch.usd = bchUsd;

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