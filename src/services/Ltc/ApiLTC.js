import axios from '../../axios';

class ApiLTC{
    getBalance(address){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.2/LTC/getBalance/${address}`)
                    .then(resp => {
                        resolve(resp.data.balance);
                    })
            } catch (error) {
                reject(error);
            }
        })   
    }
    getTransactionsList(address){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.2/LTC/getTransactionsList/${address}`)
                    .then(resp => {
                        resolve(resp.data);
                    })
            } catch (error) {
                reject(error);
            }
        })   
    }
    getUtxos(address){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.2/LTC/getUTXOs/${address}`)
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
                axios.get(`v4.2/LTC/sendRawTransaction/${raw}`)
                    .then(resp => {
                        resolve(resp.data);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
}
export default ApiLTC;