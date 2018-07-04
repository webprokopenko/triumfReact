import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactFileReader from 'react-file-reader';
import Bch from '../../../services/Bch/Bch';
import Eth from '../../../services/Eth/Eth';
import Btc from '../../../services/Btc/Btc';
import CSS from './Account.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.Bch = new Bch();
        this.Eth = new Eth();
        this.Btc = new Btc();
        this.key = {}
        this.state = {
            typeAccount: 'eth',
            newPass: '',
            authPass: ''
        }
    }
    handleChange = (event) => {
        this.setState({ typeAccount: event.target.value });
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

    generateAccount = () => {
        switch (this.state.typeAccount) {
            case 'eth':
                this.Eth.generateEthKeyFile(this.state.newPass);
                break;
            case 'btc':
                this.Btc.generateBtcAccount(this.state.newPass);
                break;
            case 'bch':
                this.Bch.generateBchAccount(this.state.newPass);
                break;
            default:
                break;
        }
    }
    auth = async() => {
        switch (this.key.blockchain) {
            case 'eth':
                let copyKey = Object.assign({}, this.key);
                let privateKey =  await this.Eth.recoveryKey(this.state.authPass, copyKey)
                this.key.privateKey = privateKey;
                this.props.addNewWallet(this.key);
                break;
            case 'btc':
                let pKey = this.Btc.recoveryKey(this.state.authPass, this.key);
                this.key.privateKey = pKey.privatekey;
                this.props.addNewWallet(this.key)
                break;
            case 'bch':
                try {
                    let privateKey = this.Bch.recoveryKey(this.state.authPass, this.key);
                    this.key.privateKey = privateKey.privatekey;
                    this.props.addNewWallet(this.key)
                    
                } catch (error) {
                    console.log(error);
                }
                break;
            default:
                console.log('switch blockchain deffault');
        }
    }
    render() {
        return (
            <div>
                <select
                    value={this.state.typeAccount}
                    onChange={this.handleChange}>
                    <option key='eth' value='eth'>
                        ETH
                        </option>
                    <option key='btc' value='btc'>
                        BTC
                        </option>
                    <option key='bch' value='bch'>
                        BCH
                        </option>
                </select>
                <h2>Generate New Account</h2>

                <input type="input" className={CSS.input_send_transaction} value={this.state.newPass} onChange={(event) => this.setState({ newPass: event.target.value })} />
                <span className={CSS.label_send_transaction}>PASSWORD</span>
                <br />
                <button className={CSS.button_send} onClick={() => this.generateAccount()}>GENERATE ACCOUNT</button>

                <h2>Auth from file</h2>
                <div>
                    <label>Key File:</label>
                    <ReactFileReader fileTypes={["*"]} base64={false} multipleFiles={false} handleFiles={this.uploadFiles}>
                        <button className='btn'>Upload</button>
                    </ReactFileReader>

                    <input type="input" className={CSS.input_send_transaction} value={this.state.authPass} onChange={(event) => this.setState({ authPass: event.target.value })} />
                    <span className={CSS.label_send_transaction}>
                        PASSWORD
                    </span>
                </div>
                <br />
                <button className={CSS.button_send} onClick={() => this.auth()}>AUTH FROM FILE</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        globalWallets: state.wallets
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addNewWallet: (wallet) => dispatch({ type: 'ADD_WALLET', wallet: wallet })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account); 