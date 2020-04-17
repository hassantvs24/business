import http from './httpService';
import config from '../config.json';
const url = config.apiEndpoint+'auth/login';
const user_url = config.apiEndpoint+'auth/me';
const tokenKey = "token";

http.setJwt(getJwt());

 async function login(email, password) {
    const {data: jwt} = await http.post(url, {
        email: email,
        password: password
    });

    localStorage.setItem(tokenKey, jwt.access_token);
  }

 function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
  }

 function logout() {
    localStorage.removeItem(tokenKey);
  }


  async function getCurrentUser(){
    try{
        const jwt = getJwt();
        if(!jwt) return null;
        const user = await http.post(user_url);
        return user.data;
      } catch (ex) {
       return null;
      }
  }

  function getJwt(){
      return localStorage.getItem(tokenKey);
  }

  export default {
      login, 
      loginWithJwt,
      logout,
      getCurrentUser,
      getJwt
  }