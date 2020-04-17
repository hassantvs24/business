import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/discount';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function discountData(){
  return http.get(url);
}

export function discountColumn(){
  return [{ name: "name", label: "Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "amount", label: "Discount",options: {
         filter: true,
         sort: true,
        }},

        { name: "discount_type", label: "Discount Type",options: {
          filter: true,
          sort: true,
         }}];
}


export function discountSave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  return http.post(url, data);
}

export function discountGet(id) {
  return http.get(singleUrl(id));
}

export function discountDel(id) {
  return http.delete(singleUrl(id));
}
