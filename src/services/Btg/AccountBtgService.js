import * as BG from 'bgoldjs-lib';
import * as crypto from 'crypto-browserify';
import {Networks} from './networks';
import { KeyDataToFile } from '../KeyDataToFile';
import * as Big from 'bignumber.js';

class AccountBchService {
    constructor(network) {
        this.network = network;
        this.keyObject = {}
        this.KeyData = new KeyDataToFile();
    }
    generateKeys(passphrase: string) {
        const net = BG.networks['bitcoingold'];
        const pKey = BG.ECPair.makeRandom({
            network: net
        });

        const privatekey = pKey.toWIF();
        const address = pKey.getAddress(net);
        return this.saveToKeyObject(passphrase, privatekey, address);
    }
    saveToKeyObject(passphrase, privatekey, address) {
        const cifer = crypto.createCipher('aes256', passphrase);
        let cifertext = cifer.update(Buffer.from(privatekey), 'utf8', 'hex')
        cifertext += cifer.final('hex');
        return {
            address: address,
            calg: 'aes256',
            cifertext: cifertext,
            blockchain: 'btg'
        }
    }
    recoveryFromKeyObject(passphrase: string, keyObject: object) {
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
    }
    /**
     * 
     * @param {string} privateKey  private key sender's
     * @param {string} utx  utxo from address sender
     * @param {string} receiver address to
     * @param {int} amount amount BTC
     * @param {string} change address where send rest of BTC
     */
    prepareTransaction(privateKey, utxos, toAddress, quantity, fromAddress) {
        const keyPair = BG.ECPair.fromWIF(privateKey, Networks['BTG']['livenet']);

        const pk = BG.crypto.hash160(keyPair.getPublicKeyBuffer());
        const spk = BG.script.pubKeyHash.output.encode(pk);

        const txb = new BG.TransactionBuilder(Networks['BTG']['livenet']);
        const inpAmount = [];
        const dec = new Big(1e8);
        const hashType = BG.Transaction.SIGHASH_ALL | BG.Transaction.SIGHASH_FORKID;
        utxos.forEach((utx, i) => {
            inpAmount[i] = parseInt((new Big(utx.amount)).mul(dec).toString(), 10);
            txb.addInput(utx.txid, utx.vout, BG.Transaction.DEFAULT_SEQUENCE, spk);
        });
    
        const spendAmmount = (new Big(quantity)).mul(dec);
        const rest = new Big(inpAmount.reduce((a, i) => (new Big(a)).plus(new Big(i))));
        txb.addOutput(toAddress, parseInt(spendAmmount.toString(), 10));
        txb.addOutput(fromAddress, parseInt(rest.minus(spendAmmount).minus(new Big(10000)).toString(), 10));
        txb.enableBitcoinGold(true);
        txb.setVersion(2);
        inpAmount.forEach((am, k) => {
            txb.sign(k, keyPair, null, hashType, parseInt(am, 10));
        });
        const raw = txb.build().toHex();
        return raw;
    }
}
export default AccountBchService; 