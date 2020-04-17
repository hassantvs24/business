import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'supplier-category';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function supplierCategoryData(){
  return http.get(url);
}

export function supplierCategoryColumn(){
        return [{ name: "code", label: "Code", options: {
            filter: true,
            sort: true,
          }},

          { name: "name", label: "Name", options: {
                filter: true,
                sort: true,
          }}];
}


export function supplierCategorySave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function supplierCategoryGet(id) {
  return http.get(singleUrl(id));
}

export function supplierCategoryDel(id) {
  return http.delete(singleUrl(id));
}
