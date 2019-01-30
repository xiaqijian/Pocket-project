import axios from 'axios'
import { Toast } from 'vant';

const service = axios.create({
  timeout: 50000 
})

service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
      console.log(response)
    if(response.data.code == -200) {
      Toast(response.data.msg);
      return Promise.reject(response.data.msg)
    }
    if(response.code == 0) {
        return response
    }
    return response
   
  },
  error => {
    console.log('err' + error)// for debug
    Toast(error.message);
    return Promise.reject(error)
  }
)

export default service
