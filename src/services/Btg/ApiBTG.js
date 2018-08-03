import axios from '../../axios';

class ApiBCH{
    getBalance(address){
        return new Promise((resolve, reject)=>{
            try {
                axios.get(`v4.2/BTG/getBalance/${address}`)
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
                axios.get(`v4.2/BTG/getTransactionsList/${address}`)
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
                axios.get(`v4.2/BTG/getUtxos/${address}`)
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
                axios.get(`v4.2/BTG/sendRawTransaction/${raw}`)
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