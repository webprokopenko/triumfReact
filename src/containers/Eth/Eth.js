    import React, { Component } from 'react';
    import axios from '../../axios';
import AccountService from '../../services/AccountService';
import ReactFileReader from 'react-file-reader';
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
    }
    componentWillMount() {
        this.getSystemData();
    }
    generateEthKeyFile() {
        const aService = new AccountService();
        aService.createETHAccount(this.state.password);
    }
    uploadFiles = files => {
        const file = new FileReader();
        file.readAsText(files[0]);
        file.onload = (event) => {
            try {
                const keyFile = JSON.parse(event.target.result);
                console.log('keyFile: ');
                console.dir(keyFile);
                this.keyFile = keyFile;
                this.setState({ address: '0x' + keyFile.address })
                this.getTransactionCount('0x' + keyFile.address);

            } catch (e) {
                console.dir(e);
                this.setState({ error: true })
            }
        }
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
                this.sendRawTransaction(rawTx)
                    .then(transactionHash => {
                        this.getTransactionByHash(transactionHash)
                            .then(transactionInfo => {
                                console.log(transactionInfo);
                            })
                    })
            })
    }
    getTokenBalance(){
        let contractAddress = '0x4c3f9408f77ca93eb528ca0ae3c99d72434466e2';
        try {
            axios.get(`v4.0/ETH/getTokenBalance/${contractAddress}/${this.state.address}`)
                .then(resp => {
                    console.log('Token balance: ');
                    console.log(resp.data.tokens);
                })
        } catch (error) {
            this.setState({ error: true });
            console.log('getTokenBalance Error: ' + error);
        }
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
            this.sendRawTransaction(rawTx)
                .then(transactionHash => {
                    this.getTransactionByHash(transactionHash)
                        .then(transactionInfo => {
                            console.log(transactionInfo);
                        })
                })
        })
    }
    async getPrivateKey(passPhrase, keyFile) {
        try {
            const bService = new AccountService();
            const privateKey = await bService.openETHAccount(passPhrase, keyFile);
            return privateKey;
        } catch (error) {
            console.log('PassPharase not valid!');
        }

    }
    getSystemData() {
        try {
            axios.get('v4.0/ETH/getPriceLimit')
                .then(resp => {
                    this.setState({ gasLimit: resp.data.gasLimitHex })
                    this.setState({ gasPrice: resp.data.gasPriceHex })
                    console.dir('gasLimitHex: ' + resp.data.gasLimitHex);
                    console.dir('gasPriceHex: ' + resp.data.gasPriceHex);
                })
        } catch (error) {
            this.setState({ error: true });
            console.log('GetSystemData Error: ' + error);
        }
    }
    getTransactionCount(address) {
        try {
            axios.get(`v4.0/ETH/getTransactionCount/${address}`)
                .then(resp => {
                    let transactionCount = Number(resp.data.TransactionCount).toString(16);
                    this.setState({ transactionCount: '0x' + transactionCount })

                })
        } catch (error) {
            this.setState({ error: true });
            console.log('getTransactionCount Error: ' + error);
        }
    }
    sendRawTransaction(raw) {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.0/ETH/sendRawTransaction/${raw}`)
                    .then(resp => {
                        resolve(resp.data.hash);
                    })
            } catch (error) {
                this.setState({ error: true });
                reject(error);
            }
        })
    }
    getTransactionByHash(hash) {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.0/ETH/getTransactionByHash/${hash}`)
                    .then(resp => {
                        resolve(resp);
                    })
            } catch (error) {
                this.setState({ error: true });
                reject(error)
            }
        })
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
                        <button onClick={() => this.getTokenBalance()}>Get Token Balance</button>
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