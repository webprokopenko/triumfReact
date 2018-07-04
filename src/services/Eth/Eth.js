import { AccountEthService } from './AccountEthService';
import { ApiETH } from './ApiETH';

class Eth {
    constructor() {

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
            transactionHash: '',
            error: false
        }
        this.keyFile = {};
        this.ApiETH = new ApiETH();
        this.AccountService = new AccountEthService();
    }
    componentWillMount() {
        this.getSystemData();
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

        let transactionHash = await this.ApiETH.sendRawTransaction(rawTx);
        console.log('TransactionHash: ');
        console.log(transactionHash);
    }
    async getTransactionCount(address) {
        let count =  await this.ApiETH.getTransactionCount('0x' + address)
        return count;
    }
    async getSystemData() {
        try {
            let priceLimit = await this.ApiETH.getPriceLimit();
            return priceLimit;
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

}
export default Eth;