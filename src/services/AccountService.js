import {Account} from "../models/Account";
import * as Keythereum from "keythereum";

export default class AccountService {
    constructor() {
        this.libKeythereum = Keythereum;
    }

    _keyFileName(address: string): string {
        const cd = new Date();
        const month = ((cd.getMonth() + 1).toString().length === 1) ?
            '0' + (cd.getMonth() + 1).toString() : (cd.getMonth() + 1).toString();
        const days = (cd.getDate().toString().length === 1) ?
            '0' + cd.getDate().toString() : cd.getDate().toString();
        const hours = (cd.getHours().toString().length === 1) ?
            '0' + cd.getHours().toString() : cd.getHours().toString();
        const mins = (cd.getMinutes().toString().length === 1) ?
            '0' + cd.getMinutes().toString() : cd.getMinutes().toString();
        const seconds = (cd.getSeconds().toString().length === 1) ?
            '0' + cd.getSeconds().toString() : cd.getSeconds().toString();
        const mseconds = (cd.getMilliseconds().toString().length === 1) ?
            '00' + cd.getMilliseconds().toString() :
            ((cd.getMilliseconds().toString().length === 2) ? '0' + cd.getMilliseconds().toString()
                : cd.getMilliseconds().toString());
        const filename = 'UTC--' + cd.getFullYear() + '-'
            + month + '- ' + days + 'T' + hours + ':' + mins + ':' + seconds + '.' + mseconds +
            'Z--' + address;
        return filename;
    }

    createETHAccount(passphrase) {
        const opts = {keyBytes: 32, ivBytes: 16},
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

        if (keyFile) {
            this.saveKeyFile(keyFile);
            const account = new Account();
            account.address = '0x' + keyFile.address;
            account.key = dk;
            account.network = 'Ropsten';
            account.symbol = 'ETH';
            account.transactions = [];
            account.balance = '';
            account.unlock = true;
            account.open = false;
            account.hide = true;
            account.refresh = false;
        }
    }
    openETHAccount(passphrase, Keyfile){
        return new Promise((resolve, reject) =>{
            try{
                let privateKey = this.libKeythereum.recover(passphrase, Keyfile);
                
                resolve(privateKey);
            } catch (e){
                reject(e);
            }
        })
    }
    saveKeyFile(keyFile){
        const blob = new Blob([JSON.stringify(keyFile)], {type: 'text/json'});
        const e = document.createEvent('MouseEvent');
        const a = document.createElement('a');
        a.download = this._keyFileName(keyFile.address);
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true,
            false, window,
            0, 0, 0, 0,
            0, false, false,
            false, false, 0,
            null);
        a.dispatchEvent(e);
    }
}