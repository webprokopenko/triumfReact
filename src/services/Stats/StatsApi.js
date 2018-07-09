import axios from '../../axios';
export default class StatsAPI {
   static getHotEthUSD() {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.2/STATS/ETH-USD`)
                    .then(resp => {
                        resolve(resp.data.value);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
    static getHotBtcUSD() {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.2/STATS/BTC-USD`)
                    .then(resp => {
                        resolve(resp.data.value);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
    static getHotBchUSD() {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.2/STATS/BCH-USD`)
                    .then(resp => {
                        resolve(resp.data.value);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
    static getHotBtgUSD() {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.2/STATS/BTG-USD`)
                    .then(resp => {
                        resolve(resp.data.value);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
    static getHotLtcUSD() {
        return new Promise((resolve, reject) => {
            try {
                axios.get(`v4.2/STATS/LTC-USD`)
                    .then(resp => {
                        resolve(resp.data.value);
                    })
            } catch (error) {
                reject(error);
            }
        })
    }
}