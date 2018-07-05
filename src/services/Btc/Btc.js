import BtcAccountService from '../../services/Btc/AccountBtcService';
import ApiBTC from '../../services/Btc/ApiBTC';

class Btc {
    constructor(){
        this.key={};
        this.BtcAccountService = new BtcAccountService('testnet');
        this.Api = new ApiBTC();
    }
    async getBalance(address){
        let balance = await this.Api.getBalance(address);
        return balance;
    }
    generateBtcAccount(passphrase){
        let obj = this.BtcAccountService.generateKeys(passphrase);
        this.BtcAccountService.KeyData.saveObject(obj);
    }
    recoveryKey (passphrase, key) {
        return this.BtcAccountService.recoveryFromKeyObject(passphrase, key);
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
        let rawTransaction = this.BtcAccountService.prepareTransaction(params.PrivateKey, utxos.utxos, params.ToAdress,params.Quantity,params.FromAddress);
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
export default Btc;