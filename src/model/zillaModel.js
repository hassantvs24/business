import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/zilla';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function zillaData(){
  return http.get(url);
}

export function zillaColumn(){
  return [{ name: "name", label: "Zilla Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "division", label: "Division Name",options: {
         filter: true,
         sort: true,
        }}];
}


export function zillaSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function zillaGet(id) {
  return http.get(singleUrl(id));
}

export function zillaDel(id) {
  return http.delete(singleUrl(id));
}
