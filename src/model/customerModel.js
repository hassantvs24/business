import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'customers';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function customerData(){
  return http.get(url);
}

export function customerColumn(){
  return [{ name: "code", label: "S/N", options: {
         filter: true,
         sort: true,
        }},

        { name: "name", label: "Name",options: {
         filter: true,
         sort: true,
        }},

        { name: "contact", label: "Contact", options: {
          filter: true,
          sort: true,
         }},

         { name: "email", label: "Email", options: {
          filter: true,
          sort: true,
         }},

         { name: "address", label: "Address", options: {
          filter: true,
          sort: true,
         }},

         { name: "balance", label: "Balance", options: {
          filter: true,
          sort: true,
         }}];
}


export function customerSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function customerGet(id) {
  return http.get(singleUrl(id));
}

export function customerDel(id) {
  return http.delete(singleUrl(id));
}
