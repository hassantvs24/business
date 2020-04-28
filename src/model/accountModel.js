import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'accounts';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function accountData(){
  return http.get(url);
}

export function accountColumn(){
  return [{ name: "name", label: "Account Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "account_number", label: "Account Number",options: {
         filter: true,
         sort: true,
        }},
        { name: "description", label: "Account Details",options: {
          filter: true,
          sort: true,
        }}];
}


export function accountSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function accountGet(id) {
  return http.get(singleUrl(id));
}

export function accountDel(id) {
  return http.delete(singleUrl(id));
}
