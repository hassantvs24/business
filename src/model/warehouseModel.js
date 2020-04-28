import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'settings/warehouses';
const url2 = config.apiEndpoint+'settings/warehouses/update';


function singleUrl(id){
    return `${url}/${id}`;
  }


export function warehouseData(){
  return http.get(url);
}

export function warehouseColumn(){
  return [{ name: "name", label: "Name", options: {
         filter: true,
         sort: true,
        }},

        { name: "proprietor", label: "Proprietor",options: {
         filter: true,
         sort: true,
        }},

        { name: "contact", label: "Contact",options: {
          filter: true,
          sort: true,
         }},
        { name: "email", label: "Email",options: {
        filter: true,
        sort: true,
        }},

        { name: "address", label: "Address",options: {
        filter: true,
        sort: true,
        }},
        { name: "website", label: "Website",options: {
          filter: true,
          sort: true,
          }},
        { name: "phone", label: "Phone",options: {
          filter: true,
          sort: true,
          }},
        { name: "contact_alternate", label: "A.Contact",options: {
          filter: true,
          sort: true,
          }}];
}


export function warehouseSave(data) {
     var headers = [];
     headers["Content-Type"] = "multipart/form-data";
     http.setHeader(headers);



  if(data.id){
      const body = {...data};
     // delete body.id;
      const formData = new FormData();
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
      
      return http.post(url2, formData)
  }

  const body = {...data};

  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('contact', body.contact);
  formData.append('address', body.address);
  formData.append('proprietor', body.proprietor);
  formData.append('email', body.email);
  formData.append('website', body.website);
  formData.append('phone', body.phone);
  formData.append('contact_alternate', body.contact_alternate);
  formData.append('logo', body.logo);

  return http.post(url, formData);
}

export function warehouseGet(id) {
  return http.get(singleUrl(id));
}

export function warehouseDel(id) {
  return http.delete(singleUrl(id));
}
