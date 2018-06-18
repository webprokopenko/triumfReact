import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://193.200.173.204/api/'
});

export default instance;