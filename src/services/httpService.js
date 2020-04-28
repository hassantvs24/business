import axios from 'axios';
import {toast} from 'react-toastify';

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if(!expectedError){
      toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
  });

  function setJwt(jwt){
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  function setHeader(hederArray){
    hederArray.forEach((val, i) => {
      axios.defaults.headers.common[i] = val;
    });
  }


  export default {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      delete: axios.delete,
      setJwt,
      setHeader
  }