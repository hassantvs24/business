import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'customer-category';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function customerCategoryData(){
  return http.get(url);
}

export function customerCategoryColumn(){
  return [{ name: "code", label: "Code", options: {
            filter: true,
            sort: true,
          }},

          { name: "name", label: "Name", options: {
                filter: true,
                sort: true,
          }}];
}


export function customerCategorySave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function customerCategoryGet(id) {
  return http.get(singleUrl(id));
}

export function customerCategoryDel(id) {
  return http.delete(singleUrl(id));
}
