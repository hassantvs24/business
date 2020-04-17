import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'units';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function unitData(){
  return http.get(url);
}

export function unitColumn(){
  return [{ name: "name", label: "Short Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "full_name", label: "Full Name",options: {
         filter: true,
         sort: true,
        }}];
}


export function unitSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function unitGet(id) {
  return http.get(singleUrl(id));
}

export function unitDel(id) {
  return http.delete(singleUrl(id));
}
