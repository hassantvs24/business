import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'products';
const urlTr = config.apiEndpoint+'products/transaction';

function singleUrl(id){
    return `${url}/${id}`;
  }

export function productsData(){
  return http.get(url);
}

export function productsTrData(id){
  return http.get(`${urlTr}/${id}`);
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


        { name: "sell_price", label: "Sell Price", options: {
        filter: true,
        sort: true,
        }},

        { name: "purchase_price", label: "Purchase Price",options: {
         filter: true,
         sort: true,
        }},

        { name: "current_stock", label: "Stock", options: {
        filter: true,
        sort: true,
        }},

        { name: "unit", label: "Unit", options: {
        filter: true,
        sort: true,
        }},

        { name: "alert_quantity", label: "Alert Qty", options: {
        filter: true,
        sort: true,
        }}];
}

export function productsTrColumn(){
  return [{ name: "sku", label: "SKU", options: {
         filter: true,
         sort: true,
        }},

        { name: "name", label: "Name", options: {
        filter: true,
        sort: true,
        }},

        { name: "transaction_point", label: "Transaction Type", options: {
          filter: true,
          sort: true,
          }},

        { name: "ref", label: "Ref", options: {
          filter: true,
          sort: true,
          }},

        { name: "in_stock", label: "Stock In", options: {
        filter: true,
        sort: true,
        }},

        { name: "out_stock", label: "Stock Out", options: {
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
