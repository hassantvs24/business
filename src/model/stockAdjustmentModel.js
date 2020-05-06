import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'stock/adjustment';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function stockAdjustmentData(){
  return http.get(url);
}

export function stockAdjustmentColumn(){
  return [{ name: "code", label: "Reference ID", options: {
         filter: true,
         sort: true,
        }},

        { name: "warehouses", label: "Warehouse", options: {
          filter: true,
          sort: true,
         }},

        { name: "recover_amount", label: "Recover Amount",options: {
         filter: true,
         sort: true,
        }},

        { name: "description", label: "Description",options: {
         filter: true,
         sort: true,
        }}];
}


export function stockAdjustmentSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function stockAdjustmentGet(id) {
  return http.get(singleUrl(id));
}

export function stockAdjustmentDel(id) {
  return http.delete(singleUrl(id));
}