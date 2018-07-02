import React, { Component } from 'react';
import Wallet from './Wallet/Wallet';
import LogoBtc from '../../../assets/images/icons/btc.png';

class Wallets extends Component {
    render () {
        return <Wallet
        img = {LogoBtc}
        couse_usd = {16.398}
        alt = 'TRIUMF TRT TRR'
        name = 'BTC'
        amount = {0.00003}
        amount_usd = {389}
        />
    }
}
export default Wallets;