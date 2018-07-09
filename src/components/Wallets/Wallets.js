import React, { Component } from 'react';
import {connect} from 'react-redux';

import Wallet from './Wallet/Wallet';

class Wallets extends Component {
    render() {
        return this.props.wallets.map((key, val) => {
            let amount_usd = (key.balance!='...'? (this.props.curr[key.blockchain].usd * key.balance): '...');
            return <Wallet
                key={this.props.wallets.indexOf(key)}
                logo={this.props.globalWallets[val].logo}
                couse_usd={this.props.curr[key.blockchain].usd}
                name={key.blockchain}
                amount={key.balance}
                amount_usd={amount_usd}
                address={key.address}
                showSend={this.props.showSend}
                showTransactionsHistory={this.props.showTransactionsHistory}
                id={val}
            />
        })
    }
}
const mapStateToProps = state =>{
    return {
        globalWallets: state.wall.wallets,
        curr: state.curr.curr
    }
}
export default connect(mapStateToProps)(Wallets);