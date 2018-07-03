import BchAccountService from './AccountBchService';
import ApiBCH from './ApiBCH';

class Bch{
    constructor(props){
        this.key={};
        this.BchAccountService = new BchAccountService('testnet');
        this.ApiBCH = new ApiBCH();
    }
    generateBchAccount(passphrase){
        let obj = this.BchAccountService.generateKeys(passphrase);
        this.BchAccountService.KeyData.saveObject(obj);
    }
    async getBalance(){
        let balance = await this.ApiBCH.getBalance(this.state.address);
        console.log('Balance: ');
        console.log(balance);
    }
    uploadFiles = files => {
        return this.BchAccountService.KeyData.uploadObject(files)
    }
    recoveryKey (passphrase, key) {
        return this.BchAccountService.recoveryFromKeyObject(passphrase, key);
    }
    async sendTransaction(params){
        let utxos = await this.ApiBCH.getUtxos(params.FromAddress);
        console.log('Utxos: ');
        console.log(utxos);
 //0.1
        let rawTransaction = this.BchAccountService.prepareTransaction(params.PrivateKey, utxos.utxos, params.ToAdress,params.Quantity,params.FromAddress);
        console.log('Raw transaction:')
        console.log(rawTransaction);

        this.ApiBCH.sendTransaction(rawTransaction)
            .then(res=>{
                console.log(res);
            })
            .catch(e=>{
                console.log(e);
            })

    }
}
export default Bch;