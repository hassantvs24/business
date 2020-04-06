import React from 'react';

const RowAction = ({onClick, editPopulate}) => {
    return ( 
        <ul className="icons-list">
            <li className="dropdown">
                <a href="#/" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="icon-menu9"></i>
                </a>

                <ul className="dropdown-menu dropdown-menu-right">
                    <li><a href="#/" onClick={editPopulate} data-toggle="modal" data-target="#ediModal" ><i className="icon-pencil5"></i> Edit</a></li>
                    <li><a onClick={onClick}  href="#/" ><i className="icon-bin"></i> Delete</a></li>
                </ul>
            </li>
        </ul>
     );
}
 
export default RowAction;