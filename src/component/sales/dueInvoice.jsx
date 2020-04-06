import React, { Component } from 'react';
import Main from '../common/main';

class DueInvoice extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Main title="Due Invoices List" header="Due Invoices List">
                    <h1>Due Invoices List</h1>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default DueInvoice;