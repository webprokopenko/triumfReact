import BchAccountService from './AccountBchService';
import ApiBCH from './ApiBCH';

class Bch{
    constructor(props){
        this.key={};
        this.BchAccountService = new BchAccountService('testnet');
        this.Api = new ApiBCH();
    }
    generateAccount(passphrase){
        let obj = this.BchAccountService.generateKeys(passphrase);
        this.BchAccountService.KeyData.saveObject(obj);
    }
    async getBalance(address){
        let balance = await this.Api.getBalance(address);
        return balance;
    }
    uploadFiles = files => {
        return this.BchAccountService.KeyData.uploadObject(files)
    }
    recoveryKey (passphrase, key) {
        return this.BchAccountService.recoveryFromKeyObject(passphrase, key);
    }
    async getTransactionsList(address) {
        let tr =  this.Api.getTransactionsList(address);
        return tr;
    }
    prepareTransaction(tr, address){
        console.log(tr);
        let preparedTrList =  tr.transactions.map((tr, key) => { 
            return (
                {
                    id:     key,
                    from:   (tr.vout[0].scriptPubKey.addresses[0] !== address ? address : tr.vout[0].scriptPubKey.addresses[0]),
                    to:     (tr.vout[1].scriptPubKey.addresses[0] === address ? address : tr.vout[1].scriptPubKey.addresses[0]),
                    value:  tr.vout[0].value,
                    date:   tr.timestamp,
                    tr_in:  (tr.vout[0].scriptPubKey.addresses[0] === address || tr.version === 2)
                }
            );
        });

        return preparedTrList;
    }
    async sendTransaction(params){
        let utxos = await this.Api.getUtxos(params.FromAddress);
        console.log('Utxos: ');
        console.log(utxos);
 //0.1
        let rawTransaction = this.BchAccountService.prepareTransaction(params.PrivateKey, utxos.utxos, params.ToAdress,params.Quantity,params.FromAddress);
        console.log('Raw transaction:')
        console.log(rawTransaction);

        this.Api.sendTransaction(rawTransaction)
            .then(res=>{
                console.log(res);
            })
            .catch(e=>{
                console.log(e);
            })

    }
}
export default Bch;