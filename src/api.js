import axios from 'axios';

const baseURL = process.env.DB_URL;

const ApiManager = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ApiManager;
