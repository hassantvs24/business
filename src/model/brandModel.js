import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'brands';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function brandData(){
  return http.get(url);
}

export function brandColumn(){
  return [{ name: "name", label: "Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "description", label: "Description",options: {
         filter: true,
         sort: true,
        }}];
}


export function saveBrand(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function getBrand(id) {
  return http.get(singleUrl(id));
}

export function delBrand(id) {
  return http.delete(singleUrl(id));
}
