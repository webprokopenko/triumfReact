import * as Litecoin from 'litecore-lib';
import * as crypto from 'crypto-browserify';
import * as Big from 'bignumber.js';
import { KeyDataToFile } from '../KeyDataToFile';

class AccountLtcService {
    constructor(network) {
        this.network = network;
        this.keyObject = {}
        this.KeyData = new KeyDataToFile();
    }
    generateKeys(passphrase: string) {
        const pKey = new Litecoin.PrivateKey(this.network);
        let privatekey = pKey.toWIF();
        return this.saveToKeyObject(passphrase, privatekey);
    }
    saveToKeyObject(passphrase, privatekey) {
        const cifer = crypto.createCipher('aes256', passphrase);
        let cifertext = cifer.update(Buffer.from(privatekey), 'utf8', 'hex')
        cifertext += cifer.final('hex');
        const pKey = Litecoin.PrivateKey.fromWIF(privatekey);
        return {
            address: pKey.toAddress().toString(),
            calg: 'aes256',
            cifertext: cifertext,
            blockchain : 'ltc'
        }
    }
    recoveryFromKeyObject(passphrase: string, keyObject: object) {
        try {
            let dKey, decifer: any = {};
            decifer = crypto.createDecipher(
                keyObject.calg,
                passphrase);
            dKey = decifer.update(keyObject['cifertext'], 'hex', 'utf8');
            dKey += decifer.final('utf8');
            return {
                privatekey: dKey,
                address: keyObject.address
            }   
        } catch (error) {
            console.log('Pasword not valid!');
        }
    }
    /**
     * 
     * @param {string} privateKey  private key sender's
     * @param {string} utx  utxo from address sender
     * @param {string} receiver address to
     * @param {int} amount amount BTC
     * @param {string} change address where send rest of BTC
     */
    prepareTransaction(privateKey, utx, receiver, amount, change) {
        const tx = Litecoin.Transaction();
        const dec = new Big(1e8);
        const utxos = [];
        utx.forEach(utxo => {
            const uAmount = new Big(utxo.amount);
            console.log(uAmount);
            utxos.push({ 
                txId: utxo.txid,
                outputIndex: utxo.vout,
                address: utxo.address,
                script: utxo.scriptPubKey,
                satoshis: parseInt(uAmount.mul(dec).toString(), 10)
            });
        });
        const BitAmount = new Big(amount);
        tx.from(utxos);
        tx.to(receiver, parseInt(BitAmount.mul(dec).toString(), 10));
        tx.change(change);
        const pKey = Litecoin.PrivateKey.fromWIF(privateKey);
        tx.sign(pKey);
        return tx.serialize();
    }
}
export default AccountLtcService; 