import React, { Component } from 'react';
import axios from '../../axios';
import {AccountEthService} from '../../services/AccountEthService';
import ReactFileReader from 'react-file-reader';
import  {ApiETH} from '../../services/ApiETH';
const EthereumTx = require('ethereumjs-tx');

class Eth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gasPrice: 0,
            transactionCount: '0x',
            gasLimit: 0,
            data: '',
            password: '1111111',
            auth_pass: '1111111',
            address: '',
            to_adress: '',
            privKey: '',
            error: false
        }
        this.keyFile = {};
        this.ApiETH = new ApiETH();
        this.AccountService = new AccountEthService();
    }
    componentWillMount() {
        this.getSystemData();
    }
    async generateEthKeyFile() {
        let ObjKeyFile = await this.AccountService.createETHAccount(this.state.password);
        this.AccountService.KeyData.saveObject(ObjKeyFile);
    }
    uploadFiles = files => {
        this.AccountService.KeyData.uploadObject(files)
            .then(keyFile=>{
                console.log('keyFile: ');
                console.dir(keyFile);
                this.keyFile = keyFile;
                this.setState({ address: '0x' + keyFile.address })
                this.ApiETH.getTransactionCount('0x' + keyFile.address)
                    .then(res=>{
                        this.setState({transactionCount:res})
                    })
                    .catch(e=>{
                        console.log(e);
                    })
            })
            .catch(error=>{
                console.dir(error);
                this.setState({ error: true })
            })
    }
    async sendEth() {
        this.getPrivateKey(this.state.auth_pass, this.keyFile)
            .then(privateKey => {
                console.log(privateKey);
                const txParams = {
                    nonce: this.state.transactionCount,
                    gasPrice: this.state.gasPrice,
                    gasLimit: '0x' + (Number(21000).toString(16)),
                    to: this.state.to_adress,
                    value: '0x' + (0.00001 * 1e18).toString(16),
                    data: '',
                    chainId: 3
                }
                const tx = new EthereumTx(txParams)
                tx.sign(privateKey)
                let rawTx = '0x' + tx.serialize().toString('hex')
                this.ApiETH.sendRawTransaction(rawTx)
                    .then(transactionHash => {
                        this.ApiETH.getTransactionByHash(transactionHash)
                            .then(transactionInfo => {
                                console.log(transactionInfo);
                            })
                    })
            })
    }
    sendTokenEth(){
        console.log("sendTokenETH");
        this.getPrivateKey(this.state.auth_pass, this.keyFile)
        .then(privateKey => {
            const templ = '0000000000000000000000000000000000000000000000000000000000000000';
            const txParams = {
                nonce: this.state.transactionCount,
                gasPrice: this.state.gasPrice,
                gasLimit: '0x' + (Number(82000).toString(16)),
                to: '0x4c3f9408f77ca93eb528ca0ae3c99d72434466e2',
                value: '0x',
                data: '0xa9059cbb000000000000000000000000'
                    + this.state.to_adress.replace('0x', '')
                    + templ.substr(0, 64 - Number(1).toString(16).length)
                    + Number(5).toString(16),
                chainId: 3
            }
            
            const tx = new EthereumTx(txParams)
            tx.sign(privateKey)
            let rawTx = '0x' + tx.serialize().toString('hex')
            this.ApiETH.sendRawTransaction(rawTx)
                .then(transactionHash => {
                    this.ApiETH.getTransactionByHash(transactionHash)
                        .then(transactionInfo => {
                            console.log(transactionInfo);
                        })
                })
        })
    }
    async getPrivateKey(passPhrase, keyFile) {
        try {
            const privateKey = await this.AccountService.openETHAccount(passPhrase, keyFile);
            return privateKey;
        } catch (error) {
            console.log('PassPharase not valid!');
        }

    }
    async getSystemData() {
        try {
            let priceLimit = await this.ApiETH.getPriceLimit();
            this.setState({ gasLimit: priceLimit.gasLimitHex });
            this.setState({ gasPrice: priceLimit.gasPriceHex });   
        } catch (error) {
            this.setState({ error: true });
            console.log('GetSystemData Error: ' + error);
        }
    }
    getTokenBalance = async () =>{
        let tokenBalance = await this.ApiETH.getTokenBalance(this.state.address);
        console.log('Token Balance: ');
        console.log(tokenBalance);
    }
    render() {
        return (
            <p>
                <p>
                    Token Balance:
                    <p>
                        <label>Adress</label>
                        <input type="text" value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} />
                    </p>
                    <p>
                        <button onClick={this.getTokenBalance}>Get Token Balance</button>
                    </p>
                </p>

                <p>
                    Generate Ethereum keyFile:
                    <p>
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                    </p>
                    <p>
                        <button onClick={() => this.generateEthKeyFile()}>Generate File</button>
                    </p>
                </p>
                Send Transaction to address:
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
                    <button onClick={() => this.sendEth()}>Send ETH</button>
                </p>
                    Send Token to address:
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
                    <button onClick={() => this.sendTokenEth()}>Send ETH</button>
                </p>
            </p>
        )
    }
}
export default Eth;