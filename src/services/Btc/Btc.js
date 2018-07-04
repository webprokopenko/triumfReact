import BtcAccountService from '../../services/Btc/AccountBtcService';
import ApiBTC from '../../services/Btc/ApiBTC';

class Btc {
    constructor(){
        this.key={};
        this.BtcAccountService = new BtcAccountService('testnet');
        this.ApiBTC = new ApiBTC();
    }
    generateBtcAccount(passphrase){
        let obj = this.BtcAccountService.generateKeys(passphrase);
        this.BtcAccountService.KeyData.saveObject(obj);
    }
    recoveryKey (passphrase, key) {
        return this.BtcAccountService.recoveryFromKeyObject(passphrase, key);
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
    async sendTransaction(params){
        let utxos = await this.ApiBTC.getUtxos(params.FromAddress);
        console.log('Utxos: ');
        console.log(utxos); 
        let rawTransaction = this.BtcAccountService.prepareTransaction(params.PrivateKey, utxos.utxos, params.ToAdress,params.Quantity,params.FromAddress);
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
}
export default Btc;