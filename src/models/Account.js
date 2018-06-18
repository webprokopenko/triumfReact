export class Account {
    constructor(){
        this.symbol;
        this.network;
        this.address;
        this._pKey;
        this.balance;
        this.open;
        this.hide;
        this.unlock;
        this.refresh;
    }
    get key(): any {
        return this._pKey;
    }
    set key(key: any) {
        this._pKey = key;
    }

}