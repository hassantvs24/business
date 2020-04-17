import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/shipment';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function shipmentData(){
  return http.get(url);
}

export function shipmentColumn(){
  return [{ name: "name", label: "Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "shipping_company", label: "Shipment Company",options: {
         filter: true,
         sort: true,
        }},
        { name: "description", label: "Descriptions",options: {
          filter: true,
          sort: true,
        }}];
}


export function shipmentSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function shipmentGet(id) {
  return http.get(singleUrl(id));
}

export function shipmentDel(id) {
  return http.delete(singleUrl(id));
}
