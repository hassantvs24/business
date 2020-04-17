import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'product-category';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function productCategoryData(){
  return http.get(url);
}

export function productCategoryColumn(){
  return [{ name: "name", label: "Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "code", label: "Code",options: {
         filter: true,
         sort: true,
        }}];
}


export function saveProductCategory(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function getProductCategory(id) {
  return http.get(singleUrl(id));
}

export function delProductCategory(id) {
  return http.delete(singleUrl(id));
}
