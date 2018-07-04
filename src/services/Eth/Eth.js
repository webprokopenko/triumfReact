import { AccountEthService } from './AccountEthService';
import { ApiETH } from './ApiETH';

class Eth {
    constructor() {
        this.keyFile = {};
        this.Api = new ApiETH();
        this.AccountService = new AccountEthService();
    }
    async generateEthKeyFile(passphrase) {
        let ObjKeyFile = await this.AccountService.createETHAccount(passphrase);
        this.AccountService.KeyData.saveObject(ObjKeyFile);
    }
    uploadFiles = files => {
        this.AccountService.KeyData.uploadObject(files)
            .then(keyFile => {
                console.log('keyFile: ');
                console.dir(keyFile);
                this.keyFile = keyFile;
                this.setState({ address: '0x' + keyFile.address })
                this.Api.getTransactionCount('0x' + keyFile.address)
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
    async recoveryKey(passphrase, key) {
        let privateKey = await this.AccountService.recoveryFromKeyObject(passphrase, key);
        return privateKey;
    }
    //0.00001
    async sendTransaction(params) {
        let rawTx = await this.AccountService.prepareTransaction(
            params.transactionCount, params.gasPrice, params.ToAdress,
            params.PrivateKey, params.Quantity
        );
        this.Api.sendRawTransaction(rawTx)
            .then(transactionHash => {
                this.Api.getTransactionByHash(transactionHash)
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

        let transactionHash = await this.Api.sendRawTransaction(rawTx);
        console.log('TransactionHash: ');
        console.log(transactionHash);
    }
    async getTransactionCount(address) {
        let count =  await this.Api.getTransactionCount('0x' + address)
        return count;
    }
    async getTransactionsList(address) {
        let privateKey = await this.Api.getTransactionsList(address);
        return privateKey;
    }
    async getSystemData() {
        try {
            let priceLimit = await this.Api.getPriceLimit();
            return priceLimit;
        } catch (error) {
            this.setState({ error: true });
            console.log('GetSystemData Error: ' + error);
        }
    }
    prepareTransaction(tr, address){
        let preparedTrList =  tr.map(tr => {
            return (
                {
                    from:   tr.from,
                    to:     tr.to,
                    value:  tr.value,
                    date:   tr.timestamp,
                    tr_in:  (tr.to === address)
                }
            );
        });

        return preparedTrList;
    }
    getTokenBalance = async () => {
        let tokenBalance = await this.Api.getTokenBalance(this.state.address);
        console.log('Token Balance: ');
        console.log(tokenBalance);
    }
    getInfoByHash = async () => {
        let transactionInfo = await this.Api.getTransactionByHash(this.state.transactionHash);
        console.log('TransactionInfo: ');
        console.log(transactionInfo);
    }

}
export default Eth;