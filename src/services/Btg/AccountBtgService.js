import * as BG from 'bitcoinjs-lib';
import * as crypto from 'crypto-browserify';
import * as btgTx from './BtgTx';
import { KeyDataToFile } from '../KeyDataToFile';

class AccountBchService {
    constructor(network) {
        this.network = network;
        this.keyObject = {}
        this.KeyData = new KeyDataToFile();
    }
    generateKeys(passphrase: string) {
        const net = BG.networks[
            this.chainId === 1 ? 'bitcoingold' : 'bitcoingoldtestnet'
        ];
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
    prepareTransaction(params) {
        const txid = new Array(0);
        const sender = new Array(0);
        const vinValue = new Array(0);
        const vin = new Array(0);
        params['utxo'].forEach(utx => {
            txid.push(utx.txid);
            sender.push(utx.address);
            vinValue.push(utx.amount);
            vin.push(utx.vout);
        });
        const btxData = [
            txid.join('_'),
            sender.join('_'),
            vinValue.join('_'),
            vin.join('_'),
            params['private'],
            params['receiver'],
            params['fees'].toString(),
            params['amount'].toString()
        ];
        console.dir(btxData);
        const raw = btgTx(btxData);
        console.dir(raw);
        return raw;
    }
}
export default AccountBchService; 