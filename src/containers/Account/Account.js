import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bch from '../../services/Bch/Bch';
import Eth from '../../services/Eth/Eth';
import Btc from '../../services/Btc/Btc';
import Ltc from '../../services/Ltc/Ltc';

import AccountUI from '../../components/Account/Account';

import LogoBtc from '../../assets/images/icons/btc.png';
import LogoEth from '../../assets/images/icons/eth.png';


class Account extends Component{
    constructor(props) {
        super(props);
        this.Bch = new Bch();
        this.Eth = new Eth();
        this.Btc = new Btc();
        this.Ltc = new Ltc();
        this.key = {}
    }
    uploadFiles = files => {
        this.Bch.uploadFiles(files)
            .then(data => {
                this.key = data
            })
            .catch(err => {
                console.log(err);
            })
    }
    generateAccount = (typeAccount, pass) => {
        switch (typeAccount) {
            case 'eth':
                this.Eth.generateAccount(pass);
                break;
            case 'btc':
                this.Btc.generateAccount(pass);
                break;
            case 'bch':
                this.Bch.generateAccount(pass);
                break;
            case 'ltc':
                this.Ltc.generateAccount(pass);
                break;
            default:
                break;
        }
    }
    auth = async(pass) => {
        switch (this.key.blockchain) {
            case 'eth':
                let copyKey = Object.assign({}, this.key);
                let privateKey =  await this.Eth.recoveryKey(pass, copyKey)
                this.key.privateKey = privateKey;
                this.key.address = '0x' + this.key.address
                this.key.balance ='...';
                this.key.logo = LogoEth;
                this.props.addNewWallet(this.key);
                let balance = 10e18 *  await this.Eth.getBalance(this.key.address);
                this.props.setBalance(this.key.address, String(balance).slice(0,7));
                break;
            case 'btc':
                let pKey = this.Btc.recoveryKey(pass, this.key);
                this.key.privateKey = pKey.privatekey;
                this.key.balance ='...';
                this.key.logo = LogoBtc;
                this.props.addNewWallet(this.key);
                this.props.setBalance(this.key.address,await this.Btc.getBalance(this.key.address));
                break;
            case 'bch':
                let pK = this.Bch.recoveryKey(pass, this.key);
                this.key.privateKey = pK.privatekey;
                this.key.balance = '...';
                this.key.logo = LogoBtc;
                this.props.addNewWallet(this.key);
                this.props.setBalance(this.key.address,await this.Bch.getBalance(this.key.address));
                break;
            case 'ltc':
                let prKey = this.Ltc.recoveryKey(pass, this.key);
                this.key.privateKey = prKey.privatekey;
                this.key.balance = '...';
                this.key.logo = LogoBtc;
                this.props.addNewWallet(this.key);
                this.props.setBalance(this.key.address,await this.Ltc.getBalance(this.key.address));
                break;
            default:
                break;
        }
    }
    render(){
        return (
            <AccountUI 
                generateAccount = {this.generateAccount}
                uploadFiles = {this.uploadFiles}
                auth = {this.auth}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        globalWallets: state.wall.wallets
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addNewWallet: (wallet) => dispatch({ type: 'ADD_WALLET', wallet: wallet }),
        setBalance: (address, balance) => dispatch({type: 'SET_BALANCE', address:address, balance: balance })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account); 
