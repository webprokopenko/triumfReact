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
}