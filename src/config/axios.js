import axios from 'axios'


const api = axios.create({
    baseURL: 'http://jeweljoust.online:8080/api/'
  });