import React, { Component } from 'react';
import {connect} from 'react-redux';

import Wallet from './Wallet/Wallet';

class Wallets extends Component {
    render() {
        return this.props.wallets.map((key, val) => {
            return <Wallet
                key={this.props.wallets.indexOf(key)}
                logo={this.props.globalWallets[val].logo}
                couse_usd={16.398}
                name={key.blockchain}
                amount={key.balance}
                amount_usd={389}
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
        globalWallets: state.wallets
    }
}
export default connect(mapStateToProps)(Wallets);