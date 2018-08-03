class AbstractBlockchain{
    constructor(accountService, blockchainApi, net){

        this.AccountService = new accountService(net ? net : 'testnet');
        this.Api = new blockchainApi();
    }
    generateAccount(passphrase){
        let obj = this.AccountService.generateKeys(passphrase);
        this.AccountService.KeyData.saveObject(obj);
    }
    async getBalance(address){
        let balance = await this.Api.getBalance(address);
        return balance;
    }
    uploadFiles = files => {
        return this.AccountService.KeyData.uploadObject(files)
    }
    recoveryKey (passphrase, key) {
        return this.AccountService.recoveryFromKeyObject(passphrase, key);
    }
    async getTransactionsList(address) {
        let tr =  this.Api.getTransactionsList(address);
        return tr;
    }
    prepareTransaction(tr, address){
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
        let rawTransaction = this.AccountService.prepareTransaction(
            params.PrivateKey, utxos.utxos, 
            params.ToAdress,params.Quantity,
            params.FromAddress
        );
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
export default AbstractBlockchain;