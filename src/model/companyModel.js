import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'company';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function companyData(){
  return http.get(url);
}

export function companyColumn(){
  return [{ name: "name", label: "Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "description", label: "Description",options: {
         filter: true,
         sort: true,
        }}];
}


export function saveCompany(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function getCompany(id) {
  return http.get(singleUrl(id));
}

export function delCompany(id) {
  return http.delete(singleUrl(id));
}
