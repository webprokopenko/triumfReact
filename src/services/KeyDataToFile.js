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
                    const keyFile = JSON.parse(event.target.result);
                    resolve(keyFile);
                }
            } catch (error) {
                reject (error)
            }
        })
    }
}