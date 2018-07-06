import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import CSS from './Account.css';

class Account extends Component {
   state = {
        typeAccount: 'eth',
        newPass: '',
        authPass: ''
    }
    render() {
        return (
            <div>
            <div className={CSS.right_side}>
                <select
                    value={this.state.typeAccount}
                    onChange={(event) => this.setState({ typeAccount: event.target.value })}>
                    <option key='eth' value='eth'>ETH</option>
                    <option key='btc' value='btc'>BTC</option>
                    <option key='bch' value='bch'>BCH</option>
                    <option key='ltc' value='ltc'>LTC</option>
                </select>
                <h2>Generate New Account</h2>
                <input type="input" className={CSS.input_send_transaction} value={this.state.newPass} onChange={(event) => this.setState({ newPass: event.target.value })} />
                <span className={CSS.label_send_transaction}>PASSWORD</span>
                <br />
                <button className={CSS.button_send} onClick={()=>this.props.generateAccount(this.state.typeAccount, this.state.newPass)}>GENERATE ACCOUNT</button>
                <h2>Auth from file</h2>
                <div>
                    <label>Key File:</label>
                    <ReactFileReader fileTypes={["*"]} base64={false} multipleFiles={false} handleFiles={this.props.uploadFiles}>
                        <button className='btn'>Upload</button>
                    </ReactFileReader>
                    <input type="input" className={CSS.input_send_transaction} value={this.state.authPass} onChange={(event) => this.setState({ authPass: event.target.value })} />
                    <span className={CSS.label_send_transaction}>
                        PASSWORD
                    </span>
                </div>
                <br />
                <button className={CSS.button_send} onClick={() => this.props.auth(this.state.authPass)}>AUTH FROM FILE</button>
            </div>
            </div>
        )
    }
}
export default Account; 