import React from 'react';

const RowAction = ({children}) => {
    return ( 
        <ul className="icons-list">
            <li className="dropdown">
                <a href="#/" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="icon-menu9"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                    {children}
                </ul>
            </li>
        </ul>
     );
}
 
export default RowAction;