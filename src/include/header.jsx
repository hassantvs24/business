import React from 'react';

const Header = () => {
    return ( 
            <div className="navbar navbar-default navbar-fixed-top header-highlight">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/#"><img src={`${process.env.PUBLIC_URL}/assets/images/logo_light.png`} alt="Logo" /></a>

                    <ul className="nav navbar-nav visible-xs-block">
                        <li><a href="/#" data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
                        <li><a href="/#" className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a></li>
                    </ul>
                </div>

                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <ul className="nav navbar-nav">
                        <li><a href="/#" className="sidebar-control sidebar-main-toggle hidden-xs" id="sidebarToggle"><i className="icon-paragraph-justify3"></i></a></li>
                    </ul>


                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/" title="Refresh this page"><i className="icon-spinner4 spinner"></i></a></li>

                        {/* <!--Stock Notification--> */}
                        <li title="Stock notification" className="dropdown">
                            <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-truck"></i>
                                <span className="visible-xs-inline-block position-right">Stock Notification</span>
                                <span className="badge bg-warning-400" id="stockNotify">0</span>
                            </a>

                            <div className="dropdown-menu dropdown-content">
                                <div className="row">
                                    <div className="col-xs-6 dropdown-content-heading"><span style={{padding: "2px 5px"}} className="bg-danger">Out of stock: <span id="out_stock_notify">0</span></span></div>
                                    <div className="col-xs-6 dropdown-content-heading text-right"> <span style={{padding: "2px 5px"}}  className="bg-primary">Stock Warning: <span id="notify_warning">0</span></span></div>

                                </div>

                                <ul className="media-list dropdown-content-body width-350" id="stock_notify_li">

                                </ul>

                            </div>
                        </li>
                        {/* <!--/Stock Notification-->

                        <!--Due Notification--> */}
                        <li title="Due Invoice notification" className="dropdown">
                            <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-task"></i>
                                <span className="visible-xs-inline-block position-right">Due Invoice Notification</span>
                                <span className="badge bg-violet-400" id="dueNotify">0</span>
                            </a>

                            <div className="dropdown-menu dropdown-content">
                                <div className="dropdown-content-heading">
                                    Due Invoice Notification
                                </div>

                                <ul className="media-list dropdown-content-body width-350" id="due_notify_li"></ul>

                            </div>
                        </li>
                        {/* <!--/Due Notification-->

                        <!--Due Notification--> */}
                        <li title="Order Invoice notification" className="dropdown">
                            <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-calendar22"></i>
                                <span className="visible-xs-inline-block position-right">Order Invoice Notification</span>
                                <span className="badge bg-teal-400" id="orderNotify">0</span>
                            </a>

                            <div className="dropdown-menu dropdown-content">
                                <div className="dropdown-content-heading">
                                    Order Invoice Notification
                                </div>

                                <ul className="media-list dropdown-content-body width-350" id="order_notify_li">

                                </ul>

                            </div>
                        </li>
                        {/* <!--/Due Notification-->

                        <!--Customer Due Notification--> */}
                        <li title="Customer Over Due Notification" className="dropdown">
                            <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-users"></i>
                                <span className="visible-xs-inline-block position-right">Customer Over Due Notification</span>
                                <span className="badge bg-indigo" id="overDueNotify">0</span>
                            </a>

                            <div className="dropdown-menu dropdown-content">
                                <div className="dropdown-content-heading">
                                    Customer Over Due Notification
                                </div>

                                <ul className="media-list dropdown-content-body width-350" id="overDue_notify_li">

                                </ul>

                            </div>
                        </li>
                        {/* <!--/Customer Due Notification--> */}


                        <li className="dropdown dropdown-user">
                            <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-user-tie"></i>
                                <span>User Name</span>
                                <i className="caret"></i>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a href="/#"><i className="icon-user-plus"></i> User Name</a></li>
                                <li><a href="/#"><i className="icon-paperplane"></i> User Email</a></li>
                                <li className="divider"></li>
                                <li><a href="/#"><i className="icon-switch2"></i> Logout</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>

     );
}
 
export default Header;