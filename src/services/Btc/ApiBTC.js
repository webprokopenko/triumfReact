
import axios from '../../axios';

class ApiBTC{
    getBalance(address){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.0/BTC/getBalance/${address}`)
                    .then(resp => {
                        resolve(resp.data.balance);
                    })
            } catch (error) {
                reject(error);
            }
        })   
    }
    getUtxos(address){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.0/BTC/getUTXOs/${address}`)
                    .then(resp => {
                        resolve(resp.data);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
    sendTransaction(raw){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.0/BTC/sendRawTransaction/${raw}`)
                    .then(resp => {
                        resolve(resp.data);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
}
export default ApiBTC;