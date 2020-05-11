import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/zone';
const zoneUrl = config.apiEndpoint+'settings/zone/find';


function singleUrl(id){
    return `${url}/${id}`;
  }

export function findLoc(location='division', id=null){
  return http.get(`${zoneUrl}/${location}/${id}`);
}

export function zoneData(){
  return http.get(url);
}

export function zoneColumn(){
  return [{ name: "name", label: "Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "address", label: "Address",options: {
         filter: true,
         sort: true,
        }}];
}


export function zoneSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function zoneGet(id) {
  return http.get(singleUrl(id));
}

export function zoneDel(id) {
  return http.delete(singleUrl(id));
}
