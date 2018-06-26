
import axios from '../axios';

class ApiBCH{
    getBalance(address){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.0/BCH/getBalance/${address}`)
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
                axios.get(`v4.0/BCH/getUTXOs/${address}`)
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
                axios.get(`v4.0/BCH/sendRawTransaction/${raw}`)
                    .then(resp => {
                        resolve(resp.data);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
}
export default ApiBCH;