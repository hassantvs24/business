import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'business';
const url2 = config.apiEndpoint+'business/update';



function singleUrl(id){
    return `${url}/${id}`;
  }

export function businessSave(data) {

  //http.setHeader([{'Content-Type': 'multipart/form-data'}, {'Content-Type': 'multipart/form-data'}]);

  var headers = [];
  headers["Content-Type"] = "multipart/form-data";

  if(data.id){

      const formData = new FormData();

      const body = {...data};

      formData.append('id', body.id);
      formData.append('name', body.name);
      formData.append('contact', body.contact);
      formData.append('address', body.address);
      formData.append('proprietor', body.proprietor);
      formData.append('email', body.email);
      formData.append('website', body.website);
      formData.append('phone', body.phone);
      formData.append('contact_alternate', body.contact_alternate);
      formData.append('logo', body.logo);

      http.setHeader(headers);
      return http.post(url2, formData)
  }
  
  return http.post(url, data);
}

export function businessGet(id) {
  return http.get(singleUrl(id));
}
