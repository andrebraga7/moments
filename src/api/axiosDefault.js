import axios from 'axios';

axios.defaults.baseURL = 'https://drf-api-andrebraga7.herokuapp.com/';
axios.defaults.headers.post['ContentType'] = 'multipart/form-data';
axios.defaults.withCredentials = true;