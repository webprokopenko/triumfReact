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
    async sendBtc(){
        let utxos = await this.ApiBCH.getUtxos(this.state.address);
        console.log('Utxos: ');
        console.log(utxos);
        let recoveryKey = this.BchAccountService.recoveryFromKeyObject('passphrase', this.key);
        console.log(recoveryKey);
        let rawTransaction = this.BchAccountService.prepareTransaction(recoveryKey.privatekey, utxos.utxos, this.state.to_adress,0.1,this.state.address);
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