import axios from 'axios'


export const api = axios.create({
    baseURL: 'http://jeweljoust.online:8080/api/', headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
  }
  } );