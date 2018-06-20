import { Account } from "../models/Account";
import * as Keythereum from "keythereum";
import { KeyDataToFile } from './KeyDataToFile';

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
                resolve(keyFile);
            } catch (error) {
                reject(error);
            }
        })
    }
    openETHAccount(passphrase, keyObject) {
        return new Promise((resolve, reject) => {
            try {
                let privateKey = this.libKeythereum.recover(passphrase, keyObject);

                resolve(privateKey);
            } catch (e) {
                reject(e);
            }
        })
    }
}