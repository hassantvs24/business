import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
 

class Aside extends Component {
    state = {  
        activePath: window.location.pathname
    }
    render() { 
        const {activePath} = this.state;
        return ( 
            <div className="sidebar sidebar-main sidebar-fixed">
                <div className="sidebar-content">
                    {/* <!-- Main navigation --> */}
                    <div className="sidebar-category sidebar-category-visible">
                        <div className="category-content no-padding">
                            <ul className="navigation navigation-main navigation-accordion">

                                {/* <!-- Main --> */}

                                <li className={(activePath === '/' ? 'active' : '')}><NavLink to="/"><i className="icon-home4"></i> <span>Dashboard</span></NavLink></li>

                                <li className="navigation-divider"></li>

                                <li className={activePath.includes("sales") ? 'active' : ''}><a href="/#"><i className=" icon-cart5"></i> <span>Sales</span></a>
                                    <ul style={{display: activePath.includes("sales") ? 'block':'none'}}>
                                        <li className={activePath === 'sales' ? 'active' : ''}><NavLink to="/sales"><i className="icon-diamond3"></i> <span>Add Sales</span></NavLink></li>
                                        <li className={activePath === 'sales/invoices' ? 'active' : ''}><NavLink to="/sales/invoices"><i className="icon-diamond3"></i> <span>Invoice List</span></NavLink></li>
                                        <li className={activePath === 'sales/due' ? 'active' : ''}><NavLink to="/sales/due"><i className="icon-diamond3"></i> <span>Due Invoice</span></NavLink></li>
                                        <li className={activePath === 'sales/return' ? 'active' : ''}><NavLink to="/sales/return"><i className="icon-diamond3"></i> <span>Sales Return</span></NavLink></li>
                                    </ul>
                                </li>

                                <li className={activePath.includes("customers") ? 'active' : ''}><a href="/#"><i className=" icon-users4"></i> <span>Customers</span></a>
                                    <ul style={{display: activePath.includes("customers") ? 'block':'none'}}>
                                        <li className={activePath === 'customers' ? 'active' : ''}><NavLink to="/customers"><i className="icon-diamond3"></i> <span>Add Customers</span></NavLink></li>
                                        <li className={activePath === 'customers/list' ? 'active' : ''}><NavLink to="/customers/list"><i className="icon-diamond3"></i> <span>Customers List</span></NavLink></li>
                                        <li className={activePath === 'customers/category' ? 'active' : ''}><NavLink to="/customers/category"><i className="icon-diamond3"></i> <span>Customers Category</span></NavLink></li>
                                    </ul>
                                </li>
                                <li className="navigation-divider"></li>
                                <li className={activePath.includes("products") ? 'active' : ''}><a href="/#"><i className=" icon-truck"></i> <span>Stock</span></a>
                                    <ul style={{display: activePath.includes("products") ? 'block':'none'}}>
                                        <li className={activePath === 'products' ? 'active' : ''}><NavLink to="/products"><i className="icon-diamond3"></i> <span>Product List</span></NavLink></li>
                                        <li className={activePath === 'products/category' ? 'active' : ''}><NavLink to="/products/category"><i className="icon-diamond3"></i> <span>Product Category</span></NavLink></li>
                                        <li className={activePath === 'products/units' ? 'active' : ''}><NavLink to="/products/units"><i className="icon-diamond3"></i> <span>Units</span></NavLink></li>
                                        <li className={activePath === 'products/brands' ? 'active' : ''}><NavLink to="/products/brands"><i className="icon-diamond3"></i> <span>Brands</span></NavLink></li>
                                        <li className={activePath === 'products/company' ? 'active' : ''}><NavLink to="/products/company"><i className="icon-diamond3"></i> <span>Company</span></NavLink></li>
                                        <li className={activePath === 'products/adjustment' ? 'active' : ''}><NavLink to="/products/stock-adjustment"><i className="icon-diamond3"></i> <span>Stock Adjustment</span></NavLink></li>
                                    </ul>
                                </li>
                                <li className="navigation-divider"></li>
                                <li className={activePath.includes("purchase") ? 'active' : ''}><a href="/#"><i className=" icon-cart"></i> <span>Purchase</span></a>
                                    <ul style={{display: activePath.includes("purchase") ? 'block':'none'}}>
                                        <li className={activePath === 'purchase' ? 'active' : ''}><NavLink to="/purchase"><i className="icon-diamond3"></i> <span>Add Purchase</span></NavLink></li>
                                        <li className={activePath === 'purchase/invoices' ? 'active' : ''}><NavLink to="/purchase/invoices"><i className="icon-diamond3"></i> <span>Purchase List</span></NavLink></li>
                                        <li className={activePath === 'purchase/due' ? 'active' : ''}><NavLink to="/purchase/due"><i className="icon-diamond3"></i> <span>Due Purchase</span></NavLink></li>
                                        <li className={activePath === 'purchase/return' ? 'active' : ''}><NavLink to="/purchase/return"><i className="icon-diamond3"></i> <span>Purchase Return</span></NavLink></li>
                                    </ul>
                                </li>

                                <li className={activePath.includes("suppliers") ? 'active' : ''}><a href="/#"><i className=" icon-user-plus"></i> <span>Suppliers</span></a>
                                    <ul style={{display: activePath.includes("suppliers") ? 'block':'none'}}>
                                        <li className={activePath === 'suppliers' ? 'active' : ''}><NavLink to="/suppliers"><i className="icon-diamond3"></i> <span>Add Suppliers</span></NavLink></li>
                                        <li className={activePath === 'suppliers/list' ? 'active' : ''}><NavLink to="/suppliers/list"><i className="icon-diamond3"></i> <span>Suppliers List</span></NavLink></li>
                                        <li className={activePath === 'suppliers/category' ? 'active' : ''}><NavLink to="/suppliers/category"><i className="icon-diamond3"></i> <span>Suppliers Category</span></NavLink></li>
                                    </ul>
                                </li>

                                <li className="navigation-divider"></li>
                                <li className={activePath.includes("expenses") ? 'active' : ''}><a href="/#"><i className=" icon-box-remove"></i> <span>Expenses</span></a>
                                    <ul style={{display: activePath.includes("expenses") ? 'block':'none'}}>
                                        <li className={activePath === 'expenses' ? 'active' : ''}><NavLink to="/expenses"><i className="icon-diamond3"></i> <span>All Expenses</span></NavLink></li>
                                        <li className={activePath === 'expenses/category' ? 'active' : ''}><NavLink to="/expenses/category"><i className="icon-diamond3"></i> <span>Expense Category</span></NavLink></li>
                                    </ul>
                                </li>

                                <li className={activePath.includes("quotations") ? 'active' : ''}><a href="/#"><i className=" icon-clipboard3"></i> <span>Quotations</span></a>
                                    <ul style={{display: activePath.includes("quotations") ? 'block':'none'}}>
                                        <li className={activePath === 'quotations' ? 'active' : ''}><NavLink to="/quotations"><i className="icon-diamond3"></i> <span>Add Quotations</span></NavLink></li>
                                        <li className={activePath === 'quotations/list' ? 'active' : ''}><NavLink to="/quotations/list"><i className="icon-diamond3"></i> <span>Quotations List</span></NavLink></li>
                                    </ul>
                                </li>

                                <li className={activePath.includes("users") ? 'active' : ''}><a href="/#"><i className=" icon-users"></i> <span>Users</span></a>
                                    <ul style={{display: activePath.includes("users") ? 'block':'none'}}>
                                        <li className={activePath === 'users' ? 'active' : ''}><NavLink to="/users"><i className="icon-diamond3"></i> <span>All Users</span></NavLink></li>
                                        <li className={activePath === 'users/roles' ? 'active' : ''}><NavLink to="/users/roles"><i className="icon-diamond3"></i> <span>User Roles</span></NavLink></li>
                                    </ul>
                                </li>

                                <li className={activePath.includes("settings") ? 'active' : ''}><a href="/#"><i className=" icon-hammer-wrench"></i> <span>Settings</span></a>
                                    <ul style={{display: activePath.includes("settings") ? 'block':'none'}}>
                                        <li className={activePath === 'settings' ? 'active' : ''}><NavLink to="/settings"><i className="icon-diamond3"></i> <span>Site Settings</span></NavLink></li>
                                        <li className={activePath === 'settings/account' ? 'active' : ''}><NavLink to="/settings/account"><i className="icon-diamond3"></i> <span>Accounts</span></NavLink></li>        
                                        <li className={activePath === 'settings/payment-method' ? 'active' : ''}><NavLink to="/settings/payment-method"><i className="icon-diamond3"></i> <span>Payment Method</span></NavLink></li>
                                        <li className={activePath === 'settings/shipment' ? 'active' : ''}><NavLink to="/settings/shipment"><i className="icon-diamond3"></i> <span>Shipment</span></NavLink></li>
                                        <li className={activePath === 'settings/warehouse' ? 'active' : ''}><NavLink to="/settings/warehouse"><i className="icon-diamond3"></i> <span>Warehouse</span></NavLink></li>
                                        <li className={activePath === 'settings/zone' ? 'active' : ''}><NavLink to="/settings/zone"><i className="icon-diamond3"></i> <span>Zone</span></NavLink></li>
                                    </ul>
                                </li>

                                <li className={activePath.includes("reports") ? 'active' : ''}><a href="/#"><i className=" icon-users"></i> <span>Reports</span></a>
                                    <ul style={{display: activePath.includes("reports") ? 'block':'none'}}>
                                        <li className={activePath === 'reports' ? 'active' : ''}><NavLink to="/reports"><i className="icon-diamond3"></i> <span>Summery Reports</span></NavLink></li>
                                    </ul>
                                </li>
                                <li className="navigation-divider"></li>

                            </ul>
                        </div>
                    </div>
                    {/* <!-- /main navigation --> */}
                </div>
            </div>
         );
    }
}
 
export default Aside;

