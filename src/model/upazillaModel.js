import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/upazilla';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function upazillaData(){
  return http.get(url);
}

export function upazillaColumn(){
  return [{ name: "name", label: "Upazilla Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "zilla", label: "District Name",options: {
         filter: true,
         sort: true,
        }},
        { name: "division", label: "Division Name",options: {
          filter: true,
          sort: true,
         }}
      ];
}


export function upazillaSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function upazillaGet(id) {
  return http.get(singleUrl(id));
}

export function upazillaDel(id) {
  return http.delete(singleUrl(id));
}
