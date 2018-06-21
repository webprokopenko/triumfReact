import React, { Component } from 'react';
import { AccountEthService } from '../../services/AccountEthService';
import ReactFileReader from 'react-file-reader';
import { ApiETH } from '../../services/ApiETH';

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
            transactionHash:'',
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
            .then(keyFile => {
                console.log('keyFile: ');
                console.dir(keyFile);
                this.keyFile = keyFile;
                this.setState({ address: '0x' + keyFile.address })
                this.ApiETH.getTransactionCount('0x' + keyFile.address)
                    .then(res => {
                        this.setState({ transactionCount: res })
                    })
                    .catch(e => {
                        console.log(e);
                    })
            })
            .catch(error => {
                console.dir(error);
                this.setState({ error: true })
            })
    }
    async sendEth() {
        let privateKey = await this.AccountService.recoveryFromKeyObject(this.state.auth_pass, this.keyFile);
        let rawTx = await this.AccountService.prepareTransaction(
            this.state.transactionCount, this.state.gasPrice, this.state.to_adress,
            privateKey, 0.00001
        );

        this.ApiETH.sendRawTransaction(rawTx)
            .then(transactionHash => {
                this.ApiETH.getTransactionByHash(transactionHash)
                    .then(transactionInfo => {
                        console.log(transactionInfo);
                    })
            })
    }
    async sendTokenEth() {
        let privateKey = await this.AccountService.recoveryFromKeyObject(this.state.auth_pass, this.keyFile);
        let rawTx = await this.AccountService.prepareTokenTransaction(
            this.state.transactionCount, this.state.gasPrice, this.state.to_adress,
            privateKey, 1
        );

        let transactionHash  = await this.ApiETH.sendRawTransaction(rawTx);
        console.log('TransactionHash: ');
        console.log(transactionHash);
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
    getTokenBalance = async () => {
        let tokenBalance = await this.ApiETH.getTokenBalance(this.state.address);
        console.log('Token Balance: ');
        console.log(tokenBalance);
    }
    getInfoByHash = async () => {
        let transactionInfo = await this.ApiETH.getTransactionByHash(this.state.transactionHash);
        console.log('TransactionInfo: ');
        console.log(transactionInfo);
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
                <p>
                    Get Transaction Info:
                    <p>
                        <label>Transaction Hash</label>
                        <input type="text" value={this.state.transactionHash} onChange={(event) => this.setState({ transactionHash: event.target.value })} />
                    </p>
                    <p>
                        <button onClick={this.getInfoByHash}>Get Info</button>
                    </p>
                </p>
            </p>
        )
    }
}
export default Eth;