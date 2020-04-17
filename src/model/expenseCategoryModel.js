import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'expense-category';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function expenseCategoryData(){
  return http.get(url);
}

export function expenseCategoryColumn(){
  return [{ name: "code", label: "Code", options: {
            filter: true,
            sort: true,
          }},

          { name: "name", label: "Name", options: {
                filter: true,
                sort: true,
          }}];
}


export function expenseCategorySave(data) {
  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function expenseCategoryGet(id) {
  return http.get(singleUrl(id));
}

export function expenseCategoryDel(id) {
  return http.delete(singleUrl(id));
}
