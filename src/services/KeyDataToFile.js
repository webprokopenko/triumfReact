import AbstractKeyData from "./AbstractKeyData";

export class KeyDataToFile extends AbstractKeyData{
    saveObject(Obj: object){
        const blob = new Blob([JSON.stringify(Obj)], { type: 'text/json' });
        const e = document.createEvent('MouseEvent');
        const a = document.createElement('a');
        a.download = this._keyFileName(Obj.address);
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
    uploadObject(files) {
        return new Promise((resolve, reject)=>{
            try {
                const file = new FileReader();
                file.readAsText(files[0]);
                file.onload = (event) => {
                    try {
                        const keyFile = JSON.parse(event.target.result);
                        switch (keyFile.blockchain) {
                            case 'eth':
                                this.checkETHfile(keyFile)
                                break;
                            default:
                                this.checkBTAfile(keyFile)
                                break;
                        }
                        resolve(keyFile);    
                    } catch (error) {
                        reject('File not valid' + error);
                    }
                    
                }
            } catch (error) {
                reject (error)
            }
        })
    }
    checkBTAfile(file){
        if(file.address === undefined  || file.cifertext === undefined || file.blockchain === undefined)
            throw new Error('File not valid');
    }
    checkETHfile(file){
        if(file.address === undefined  || 
            file.crypto === undefined || 
            file.blockchain === undefined ||
            file.version === undefined ||
            file.id === undefined ||
            file.crypto.cipher === undefined ||
            file.crypto.ciphertext === undefined ||
            file.crypto.cipherparams.iv === undefined ||
            file.crypto.mac === undefined ||
            file.crypto.kdf === undefined ||
            file.crypto.kdfparams.dklen === undefined ||
            file.crypto.kdfparams.n === undefined ||
            file.crypto.kdfparams.p === undefined ||
            file.crypto.kdfparams.r === undefined ||
            file.crypto.kdfparams.salt === undefined 
        )
            throw new Error('File not valid');
    }
}