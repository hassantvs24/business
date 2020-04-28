import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import auth from './services/authService';
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
import CustomerCategory from './component/customer/customerCategory';
import SupplierCategory from './component/supplier/supplierCategory';
import Roles from './component/users/roles';
import ExpenseCategory from './component/expense/expenseCategory';
import Expenses from './component/expense/expenses';
import Quotations from './component/quotation/quotations';
import QuotationList from './component/quotation/quotationList';
import Business from './component/settings/business';
import Brands from './component/product/brand';
import Company from './component/product/company';
import Shipment from './component/settings/shipment';
import Units from './component/product/units';
import Warehouse from './component/settings/warehouse';
import Zone from './component/location/zone';
import SummeryReports from './component/reports/summery';
import CustomerList from './component/customer/customerList';
import SupplierList from './component/supplier/supplierList';
import BrandAction from './component/product/action/brandAction';
import LoginForm from './component/auth/loginForm';
import RegisterForm from './component/auth/registerForm';
import Logout from './component/auth/logout';
import AuthHeader from './component/auth/authHeader';
import AuthRoute from './component/common/authRoute';
import CompanyAction from './component/product/action/companyAction';
import ProductCategoryAction from './component/product/action/productCategoryAction';
import UnitAction from './component/product/action/unitAction';
import Discount from './component/settings/discount';
import VatTax from './component/settings/vatTax';
import Union from './component/location/union';
import UpaZilla from './component/location/upazilla';
import Zilla from './component/location/zilla';
import Division from './component/location/division';
import ZoneAction from './component/location/action/zoneAction';
import UnionAction from './component/location/action/unionAction';
import UpazillaAction from './component/location/action/upazillaAction';
import ZillaAction from './component/location/action/zillaAction';
import DivisionAction from './component/location/action/divisionAction';
import VatTaxAction from './component/settings/action/vatTaxAction';
import DiscountAction from './component/settings/action/discountAction';
import ShipmentAction from './component/settings/action/shipmentAction';
import ExpenseCategoryAction from './component/expense/action/expenseCategoryAction';
import CustomerCategoryAction from './component/customer/action/customerCategoryAction';
import SupplierCategoryAction from './component/supplier/action/supplierCategoryAction';
import Accounts from './component/accounts/accounts';
import BalanceSheet from './component/accounts/balanceSheet';
import TrialBalance from './component/accounts/trialBalance';
import CashFlow from './component/accounts/cashFlow';
import AccountReports from './component/accounts/accountReports';
import WarehouseAction from './component/settings/action/warehouseAction';
import AccountAction from './component/accounts/action/accountAction';
import ProductAction from './component/product/action/productAction';
import './App.css';






class App extends Component {
  state = { 
    user: {}
   }

  async componentDidMount(){
      const user = await auth.getCurrentUser();
      this.setState({user});
  }

  render() { 
    const {user} = this.state;

    return ( 
      <React.Fragment>
      {!user ?  <AuthHeader /> :  <Header user={user} />}
     
      <ToastContainer />
      <div className="page-container">
        <div className="page-content">

          {user && <Aside />}
          
          <div className="content-wrapper" style={{minHeight:"95vh"}}>
            <div className="content" style={{minHeight:"95vh", position:"relative"}}>

              <Switch>

                <Route path="/auth/login" exact component={LoginForm} />
                <Route path="/auth/register" exact component={RegisterForm} />
                <Route path="/auth/logout" exact component={Logout} />

                <AuthRoute path="/" exact component={Dashboard} />

                {/* Sells: Start */}
                <AuthRoute path="/sales/point" exact component={Sales} />
                <AuthRoute path="/sales/invoices" exact component={InvoiceList} />
                <AuthRoute path="/sales/due" exact component={DueInvoice} />
                <AuthRoute path="/sales/return" exact component={SalesReturn} />
                {/* Sells: End */}

                {/* Customer: Start */}
                <AuthRoute path="/customers/list" exact component={CustomerList} />

                <AuthRoute path="/customers/category" exact component={CustomerCategory} />
                <AuthRoute path="/customers/category/:id" exact component={CustomerCategoryAction} />
                {/* Customer: End */}

                {/* Product: Start */}
                <AuthRoute path="/products/list" exact component={Products} />
                <AuthRoute path="/products/list/:id" exact component={ProductAction} />
                <AuthRoute path="/products/category" exact component={ProductCategory} />
                <AuthRoute path="/products/category/:id" exact component={ProductCategoryAction} />

                <AuthRoute path="/products/brands" exact component={Brands} />
                <AuthRoute path="/products/brands/:id" exact component={BrandAction} />

                <AuthRoute path="/products/units" exact component={Units} />
                <AuthRoute path="/products/units/:id" exact component={UnitAction} />

                <AuthRoute path="/products/company" exact component={Company} />
                <AuthRoute path="/products/company/:id" exact component={CompanyAction} />

                <AuthRoute path="/products/stock-adjustment" exact component={StockAdjustment} />
                {/* Product: End */}

                {/* Purchase: Start */}
                <AuthRoute path="/purchase/point" exact component={Purchase} />
                <AuthRoute path="/purchase/invoices" exact component={PurchaseList} />
                <AuthRoute path="/purchase/due" exact component={DuePurchase} />
                <AuthRoute path="/purchase/return" exact component={PurchaseReturn} />
                {/* Purchase: End */}

                {/* Supplier: Start */}
                <AuthRoute path="/suppliers/list" exact component={SupplierList} />

                <AuthRoute path="/suppliers/category" exact component={SupplierCategory} />
                <AuthRoute path="/suppliers/category/:id" exact component={SupplierCategoryAction} />
                {/* Supplier: End */}

                {/* Expense: Start */}
                <AuthRoute path="/expenses/list" exact component={Expenses} />

                <AuthRoute path="/expenses/category" exact component={ExpenseCategory} />
                <AuthRoute path="/expenses/category/:id" exact component={ExpenseCategoryAction} />
                {/* Expense: End */}

                {/* Accounts: Start */}
                <AuthRoute path="/accounts/list" exact component={Accounts} />
                <AuthRoute path="/accounts/list/:id" exact component={AccountAction} />
                <AuthRoute path="/accounts/balance-sheet" exact component={BalanceSheet} />
                <AuthRoute path="/accounts/trial-balance" exact component={TrialBalance} />
                <AuthRoute path="/accounts/cashflow" exact component={CashFlow} />
                <AuthRoute path="/accounts/reports" exact component={AccountReports} />
                {/* Accounts: End */}

                {/* Quotation: Start */}
                <AuthRoute path="/quotations/create" exact component={Quotations} />
                <AuthRoute path="/quotations/list" exact component={QuotationList} />
                {/* Quotation: End */}

                {/* User: Start */}
                <AuthRoute path="/users/list" exact component={Users} />
                <AuthRoute path="/users/roles" exact component={Roles} />
                {/* User: End */}

                {/* Settings: Start */}
                <AuthRoute path="/settings/business" exact component={Business} />
                <AuthRoute path="/settings/warehouse" exact component={Warehouse} />
                <AuthRoute path="/settings/warehouse/:id" exact component={WarehouseAction} />

                <AuthRoute path="/settings/discount" exact component={Discount} />
                <AuthRoute path="/settings/discount/:id" exact component={DiscountAction} />

                <AuthRoute path="/settings/vat-tax" exact component={VatTax} />
                <AuthRoute path="/settings/vat-tax/:id" exact component={VatTaxAction} />

                <AuthRoute path="/settings/shipment" exact component={Shipment} />
                <AuthRoute path="/settings/shipment/:id" exact component={ShipmentAction} />
                {/* Settings: End */}

                {/* Location: Start */}
                <AuthRoute path="/location/zone" exact component={Zone} />
                <AuthRoute path="/location/zone/:id" exact component={ZoneAction} />

                <AuthRoute path="/location/union" exact component={Union} />
                <AuthRoute path="/location/union/:id" exact component={UnionAction} />

                <AuthRoute path="/location/upazilla" exact component={UpaZilla} />
                <AuthRoute path="/location/upazilla/:id" exact component={UpazillaAction} />

                <AuthRoute path="/location/zilla" exact component={Zilla} />
                <AuthRoute path="/location/zilla/:id" exact component={ZillaAction} />

                <AuthRoute path="/location/division" exact component={Division} />
                <AuthRoute path="/location/division/:id" exact component={DivisionAction} />
                {/* Location: End */}

                <AuthRoute path="/reports/sells" exact component={SummeryReports} />

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

