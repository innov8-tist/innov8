import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
const pyServer = axios.create({
  baseURL: 'http://localhost:7000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {pyServer}
export default instance;
