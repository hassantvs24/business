import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/division';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function divisionData(){
  return http.get(url);
}

export function divisionColumn(){
  return [{ name: "name", label: "Division Name", options: {
         filter: true,
         sort: true,
        }}];
}


export function divisionSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function divisionGet(id) {
  return http.get(singleUrl(id));
}

export function divisionDel(id) {
  return http.delete(singleUrl(id));
}
