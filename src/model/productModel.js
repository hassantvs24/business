import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'products';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function productsData(){
  return http.get(url);
}

export function productsColumn(){
  return [{ name: "sku", label: "SKU", options: {
         filter: true,
         sort: true,
        }},

        { name: "name", label: "Name", options: {
        filter: true,
        sort: true,
        }},

        { name: "product_type", label: "Type", options: {
        filter: true,
        sort: true,
        }},

        { name: "productCategory", label: "Category", options: {
        filter: true,
        sort: true,
        }},

        { name: "brand", label: "Brand", options: {
        filter: true,
        sort: true,
        }},

        { name: "company", label: "Company", options: {
        filter: true,
        sort: true,
        }},


        { name: "sell_price", label: "S.Price", options: {
        filter: true,
        sort: true,
        }},

        { name: "purchase_price", label: "P.Price",options: {
         filter: true,
         sort: true,
        }},

        { name: "stock", label: "Stock", options: {
        filter: true,
        sort: true,
        }},

        { name: "unit", label: "Unit", options: {
        filter: true,
        sort: true,
        }},

        { name: "alert_quantity", label: "A.Qty", options: {
        filter: true,
        sort: true,
        }}];
}


export function productsSave(data) {

  if(data.id){
      const body = {...data};
      delete body.id;
      return http.put(singleUrl(data.id), body);
  }
  
  return http.post(url, data);
}

export function productsGet(id) {
  return http.get(singleUrl(id));
}

export function productsDel(id) {
  return http.delete(singleUrl(id));
}
