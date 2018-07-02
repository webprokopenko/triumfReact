import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import Bch from '../../../services/Bch/Bch';
import CSS from './Account.css';

class Account extends Component {
    constructor(props) {
        super(props);
        this.Bch = new Bch();
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
                console.log('eth');
                break;
            case 'btc':
                console.log('btc');
                break;
            case 'bch':
                console.log('bch');
                this.Bch.generateBchAccount(this.state.newPass);
                break;
            default:
                break;
        }
    }
    auth = () => {
        switch (this.key.blockchain) {
            case 'eth':
                console.log('eth');
                break;
            case 'btc':
                console.log('btc');
                break;
            case 'bch':
            try {
                let privateKey = this.Bch.recoveryKey(this.state.authPass, this.key);
                this.key.privateKey = privateKey.privatekey;
                console.log(this.key);
                let globalWallets = this.state.wallets;
                console.log(globalWallets);
                //globalWallets.push('this.key');
                //this.setState({wallets: this.key});
            } catch (error) {
                console.log('Password not valid');   
            }
                break;
            default:
                break;
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

                <input input type="input" className={CSS.input_send_transaction} value={this.state.newPass} onChange={(event) => this.setState({ newPass: event.target.value })} />
                <span className={CSS.label_send_transaction}>PASSWORD</span>
                <br />
                <button className={CSS.button_send} onClick={() => this.generateAccount()}>GENERATE ACCOUNT</button>

                <h2>Auth from file</h2>
                <p>
                    <label>Key File:</label>
                    <ReactFileReader fileTypes={["*"]} base64={false} multipleFiles={false} handleFiles={this.uploadFiles}>
                        <button className='btn'>Upload</button>
                    </ReactFileReader>

                    <input type="input" className={CSS.input_send_transaction} value={this.state.authPass} onChange={(event) => this.setState({ authPass: event.target.value })} />
                    <span className={CSS.label_send_transaction}>
                        PASSWORD
                        </span>
                </p>
                <br />
                <button className={CSS.button_send} onClick={() => this.auth()}>AUTH FROM FILE</button>
            </div>
        )
    }
}

export default Account;