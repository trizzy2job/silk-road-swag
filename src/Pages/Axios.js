import axios from 'axios';

export default axios.create({
    // baseURL: 'https://srsbackend.herokuapp.com/'
    baseURL: 'http://localhost:3500/'
});