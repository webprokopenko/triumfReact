import axios from '../../axios';
export class ApiETH {
    sendRawTransaction(raw) {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.0/ETH/sendRawTransaction/${raw}`)
                    .then(resp => {
                        resolve(resp.data.hash);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
    getTokenBalance(address) {
        return new Promise((resolve, reject) => {
            try {
                let contractAddress = '0x4c3f9408f77ca93eb528ca0ae3c99d72434466e2';

                axios.get(`v4.0/ETH/getTokenBalance/${contractAddress}/${address}`)
                    .then(resp => {
                        resolve(resp.data.tokens);
                    })
            } catch (error) {
                reject(error);
            }
        });
    }
    getTransactionByHash(hash) {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.0/ETH/getTransactionByHash/${hash}`, { timeout: 20000 })
                    .then(resp => {
                        resolve(resp.data);
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    getPriceLimit() {
        return new Promise((resolve, reject) => {
            try {
                axios.get('v4.2/ETH/getPriceLimit')
                    .then(resp => {
                        resolve({ gasLimit: resp.data.gasLimitHex, gasPrice: resp.data.gasPriceHex })
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    getTransactionCount(address) {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.2/ETH/getTransactionCount/${address}`)
                    .then(resp => {
                        let transactionCount = Number(resp.data.TransactionCount).toString(16);
                        resolve('0x' + transactionCount)

                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    getTransactionsList(address, page = null) {
        return true;
        page = page ? '/' + page : '';
        axios.get(`v4.2/ETH/getTransactionsList/${address}`)
            .then(resp => {
                return resp.data.transactions;

                // const preparedTr = resp.data.transactions.map(tr => {
                //     return {
                //         ...tr,
                //         datetime: new Date(tr.timestamp * 1000),
                //     }
                // });
                // return preparedTr;
            })
            .catch(error => {
                console.log('ERROR!!!!');
            })
    }
}