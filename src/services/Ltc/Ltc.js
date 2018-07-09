import LtcAccountService from './AccountLtcService';
import ApiLTC from './ApiLTC';

class Ltc{
    constructor(props){
        this.key={};
        this.LtcAccountService = new LtcAccountService('testnet');
        this.Api = new ApiLTC();
    }
    generateAccount(passphrase){
        let obj = this.LtcAccountService.generateKeys(passphrase);
        this.LtcAccountService.KeyData.saveObject(obj);
    }
    async getBalance(address){
        let balance = await this.Api.getBalance(address);
        return balance;
    }
    uploadFiles = files => {
        return this.LtcAccountService.KeyData.uploadObject(files)
    }
    recoveryKey (passphrase, key) {
        return this.LtcAccountService.recoveryFromKeyObject(passphrase, key);
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
        let rawTransaction = this.LtcAccountService.prepareTransaction(params.PrivateKey, utxos.utxos, params.ToAdress,params.Quantity,params.FromAddress);
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
export default Ltc;