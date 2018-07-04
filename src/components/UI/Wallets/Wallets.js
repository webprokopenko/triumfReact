import React, { Component } from 'react';
import Wallet from './Wallet/Wallet';
import LogoBtc from '../../../assets/images/icons/btc.png';
import LogoEth from '../../../assets/images/icons/eth.png';

class Wallets extends Component {
    setLogo = blockchain => {
        switch (blockchain) {
            case 'bch':
                return LogoBtc
            case 'btc':
                return LogoBtc
            case 'eth':
                return LogoEth

            default:
                return LogoBtc
        }
    }
    render() {
        return this.props.wallets.map((key, val) => {
            return <Wallet
                img={this.setLogo(key.blockchain)}
                couse_usd={16.398}
                alt='TRIUMF Crypto Wallet'
                name={key.blockchain}
                amount={0.00003}
                amount_usd={389}
                address={key.address}
                showSend={this.props.showSend}
                showTransactionsHistory={this.props.showTransactionsHistory}
                id={val}
            />
        })
    }
}
export default Wallets;