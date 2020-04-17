import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/union';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function unionData(){
  return http.get(url);
}

export function unionColumn(){
  return [{ name: "name", label: "Union Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "upazilla", label: "Upazilla Name",options: {
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


export function unionSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function unionGet(id) {
  return http.get(singleUrl(id));
}

export function unionDel(id) {
  return http.delete(singleUrl(id));
}
