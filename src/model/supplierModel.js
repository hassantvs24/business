import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function vatTaxData(){
  return http.get(url);
}

export function vatTaxColumn(){
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
          }}
        ];
}


export function vatTaxSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function vatTaxGet(id) {
  return http.get(singleUrl(id));
}

export function vatTaxDel(id) {
  return http.delete(singleUrl(id));
}
