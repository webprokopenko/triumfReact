import React, { Component } from 'react';
import BtcAccountService from '../../services/AccountBtcService';
import ApiBTC from '../../services/ApiBTC';
import ReactFileReader from 'react-file-reader';

class Btc extends Component{
    constructor(props){
        super(props);
        this.state = {
            address: '',
            auth_pass: '',
            to_adress: '',
            error: false
        }
        this.key={};
        this.BtcAccountService = new BtcAccountService('testnet');
        this.ApiBTC = new ApiBTC();
    }
    generateBtcAccount(){
        let obj = this.BtcAccountService.generateKeys('passphrase');
        this.BtcAccountService.KeyData.saveObject(obj);
    }
    async getBalance(){
        let balance = await this.ApiBTC.getBalance(this.state.address);
        console.log('Balance: ');
        console.log(balance);
    }
    uploadFiles = files => {
        this.BtcAccountService.KeyData.uploadObject(files)
            .then(data => {
                this.key = data;
                this.setState({address : data.address});
                console.log('Upload file: ');
                console.log(data);
            })
            .catch(e=>{
                console.log(e);
            })
    }
    async sendBtc(){
        let utxos = await this.ApiBTC.getUtxos(this.state.address);
        console.log('Utxos: ');
        console.log(utxos);
        let recoveryKey = this.BtcAccountService.recoveryFromKeyObject('passphrase', this.key);
        console.log(recoveryKey);
        let rawTransaction = this.BtcAccountService.prepareTransaction(recoveryKey.privatekey, utxos.utxos, this.state.to_adress,0.1,this.state.address);
        console.log('Raw transaction:')
        console.log(rawTransaction);

        this.ApiBTC.sendTransaction(rawTransaction)
            .then(res=>{
                console.log(res);
            })
            .catch(e=>{
                console.log(e);
            })

    }
    render(){
        return(
            <p>
                <h1>BTC</h1>
                <p>
                    <h2>GetBalance:</h2>
                    <label>Adress</label>
                    <input type="text" value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} />
                    <button onClick={()=>this.getBalance()}>Get Balance</button>
                </p>
                <p>    
                    <h2>Generate BTC account</h2>
                    <button onClick={()=>this.generateBtcAccount()}>Generate</button>
                </p>
                <p>
                    <h2>Send Transaction</h2>
                    <p>
                        <label>Key File:</label>
                        <ReactFileReader fileTypes={["*"]} base64={false} multipleFiles={false} handleFiles={this.uploadFiles}>
                            <button className='btn'>Upload</button>
                        </ReactFileReader>
                        <label>Password:</label>
                        <input type="password" value={this.state.auth_pass} onChange={(event) => this.setState({ auth_pass: event.target.value })} />
                    </p>
                    <p>
                        <label>To address:</label>
                        <input type="text" value={this.state.to_adress} onChange={(event) => this.setState({ to_adress: event.target.value })} />
                    </p>
                    <p>
                    <button onClick={() => this.sendBtc()}>Send BTC</button>
                </p>
                </p>
            </p>
        );
    }
}
export default Btc;