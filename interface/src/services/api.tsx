import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://ecommerce-backend-production-d395.up.railway.app',
  });
  
  export default Api;