import axios from 'axios';
import txtfile from './baseUrl.txt' 
const instance = axios.create({
    

});
instance.interceptors.request.use(
     async config => {
          config.baseURL = await getBaseUrl();
          return config;
     },
     error => Promise.reject(error)
);

export async function getBaseUrl() {

     var value = await fetch(txtfile)
          .then((r) => r.text())
          .then(text => { 
               return text;
          })
     return value;
}


export default instance;


