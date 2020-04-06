import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Header from './include/header';
import Aside from './include/aside';
import Footer from './include/footer';
import Dashboard from './component/dashboard';
import Sales from './component/sales/sales';
import InvoiceList from './component/sales/invoiceList';
import DueInvoice from './component/sales/dueInvoice';
import Users from './component/users/users';
import NotFound from './component/notFound';
import Purchase from './component/purchase/purchase';
import PurchaseList from './component/purchase/purchaseList';
import DuePurchase from './component/purchase/duePurchase';
import SalesReturn from './component/sales/salesReturn';
import PurchaseReturn from './component/purchase/purchaseReturn';
import Products from './component/product/products';
import ProductCategory from './component/product/productCategory';
import StockAdjustment from './component/product/stockAdjustment';
import Customers from './component/customer/customers';
import CustomerCategory from './component/customer/customerCategory';
import Suppliers from './component/supplier/suppliers';
import SupplierCategory from './component/supplier/supplierCategory';
import Roles from './component/users/roles';
import ExpenseCategory from './component/expense/expenseCategory';
import Expenses from './component/expense/expenses';
import Quotations from './component/quotation/quotations';
import QuotationList from './component/quotation/quotationList';
import SiteSettings from './component/settings/siteSettings';
import Accounts from './component/settings/account';
import Brands from './component/settings/brand';
import Company from './component/settings/company';
import PaymentMethods from './component/settings/paymentMethod';
import Shipment from './component/settings/shipment';
import Units from './component/settings/units';
import Warehouse from './component/settings/warehouse';
import Zone from './component/settings/zone';
import SummeryReports from './component/reports/summery';
import CustomerList from './component/customer/customerList';
import SupplierList from './component/supplier/supplierList';
import './App.css';


class App extends Component {
  state = {  }

  render() { 
    return ( 
    
      <React.Fragment>

      <Header />
      <ToastContainer />
      <div className="page-container">
        <div className="page-content">

          <Aside />

          <div className="content-wrapper" style={{minHeight:"100vh"}}>
            <div className="content" style={{minHeight:"100vh", position:"relative"}}>

              <Switch>
                <Route path="/" exact component={Dashboard} />

                <Route path="/sales" exact component={Sales} />
                <Route path="/sales/invoices" exact component={InvoiceList} />
                <Route path="/sales/due" exact component={DueInvoice} />
                <Route path="/sales/return" exact component={SalesReturn} />

                <Route path="/customers" exact component={Customers} />
                <Route path="/customers/list" exact component={CustomerList} />
                <Route path="/customers/category" exact component={CustomerCategory} />

                <Route path="/products" exact component={Products} />
                <Route path="/products/category" exact component={ProductCategory} />
                <Route path="/products/stock-adjustment" exact component={StockAdjustment} />

                <Route path="/purchase" exact component={Purchase} />
                <Route path="/purchase/invoices" exact component={PurchaseList} />
                <Route path="/purchase/due" exact component={DuePurchase} />
                <Route path="/purchase/return" exact component={PurchaseReturn} />

                <Route path="/suppliers" exact component={Suppliers} />
                <Route path="/suppliers/list" exact component={SupplierList} />
                <Route path="/suppliers/category" exact component={SupplierCategory} />

                <Route path="/expenses" exact component={Expenses} />
                <Route path="/expenses/category" exact component={ExpenseCategory} />

                <Route path="/quotations" exact component={Quotations} />
                <Route path="/quotations/list" exact component={QuotationList} />

                <Route path="/users" exact component={Users} />
                <Route path="/users/roles" exact component={Roles} />

                <Route path="/settings" exact component={SiteSettings} />
                <Route path="/settings/account" exact component={Accounts} />
                <Route path="/settings/brands" exact component={Brands} />
                <Route path="/settings/company" exact component={Company} />
                <Route path="/settings/payment-method" exact component={PaymentMethods} />
                <Route path="/settings/shipment" exact component={Shipment} />
                <Route path="/settings/units" exact component={Units} />
                <Route path="/settings/warehouse" exact component={Warehouse} />
                <Route path="/settings/zone" exact component={Zone} />

                <Route path="/reports" exact component={SummeryReports} />

                <Route path="/not-found" exact component={NotFound} />
                <Redirect to="/not-found" />
                
              </Switch>

              <Footer />
              
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
     );
  }
}
 
export default App;

