import axios from 'axios';
import txtfilelogin from './loginUrl.txt' 

const instancelogin = axios.create({
    
});
instancelogin.interceptors.request.use(
     async config => {
          config.baseURL = await getBaseUrl();
          return config;
     },
     error => Promise.reject(error)
);

export async function getBaseUrl() {

     var value = await fetch(txtfilelogin)
          .then((r) => r.text())
          .then(text => { 
               return text;
          })
     return value;
}


export default instancelogin;