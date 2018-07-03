import * as Keythereum from "keythereum";
import { KeyDataToFile } from '../KeyDataToFile';
const EthereumTx = require('ethereumjs-tx');

export class AccountEthService {
    constructor() {
        this.libKeythereum = Keythereum;
        this.KeyData = new KeyDataToFile();
    }
    createETHAccount(passphrase) {
        return new Promise((resolve, reject) => {
            try {
                const opts = { keyBytes: 32, ivBytes: 16 },
                    dk = this.libKeythereum.create(opts),
                    options = {
                        kdf: 'scrypt',
                        cipher: 'aes-128-ctr',
                        kdfparams: {
                            n: 262144,
                            dklen: 32,
                            p: 8,
                            r: 1
                        }
                    },
                    keyFile = this.libKeythereum.dump(
                        passphrase,
                        dk.privateKey,
                        dk.salt,
                        dk.iv,
                        options);
                    keyFile.blockchain ='eth';
                resolve(keyFile);
            } catch (error) {
                reject(error);
            }
        })
    }
    recoveryFromKeyObject(passphrase, keyObject) {
        return new Promise((resolve, reject) => {
            try {
                delete keyObject.blockchain
                let privateKey = this.libKeythereum.recover(passphrase, keyObject);

                resolve(privateKey);
            } catch (e) {
                reject(e);
            }
        })
    }
    /**
     * 
     * @param {number} trCount  transaction count
     * @param {number} gasPrice  gasPrice
     * @param {string} receiver address to
     * @param {string} privateKey private key sender's
     * @param {float} amount amount ETH
     */
    prepareTransaction(trCount, gasPrice, receiver, privateKey , amount){
        const txParams = {
            nonce: trCount,
            gasPrice: gasPrice,
            gasLimit: '0x' + (Number(21000).toString(16)),
            to: receiver,
            value: '0x' + (amount * 1e18).toString(16),
            data: '',
            chainId: 3
        }
        const tx = new EthereumTx(txParams)
        tx.sign(privateKey)
        return '0x' + tx.serialize().toString('hex')
    }
    prepareTokenTransaction(trCount, gasPrice, receiver, privateKey, amount){
        const templ = '0000000000000000000000000000000000000000000000000000000000000000';
                const txParams = {
                    nonce: trCount,
                    gasPrice: gasPrice,
                    gasLimit: '0x' + (Number(82000).toString(16)),
                    to: '0x4c3f9408f77ca93eb528ca0ae3c99d72434466e2',
                    value: '0x',
                    data: '0xa9059cbb000000000000000000000000'
                        + receiver.replace('0x', '')
                        + templ.substr(0, 64 - Number(1).toString(16).length)
                        + Number(5).toString(16),
                    chainId: 3
                }

                const tx = new EthereumTx(txParams)
                tx.sign(privateKey)
                return '0x' + tx.serialize().toString('hex');
    }
}