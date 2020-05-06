import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Main from '../common/main';
import {productsTrData, productsTrColumn} from '../../model/productModel';
import config from '../../config/index';
import { Link } from 'react-router-dom';

class ProductTransaction extends Component {
    state = { 
        data: [],
        errors: {}
     }

    async componentDidMount(){
        const dataID = this.props.match.params.id;
        const {data: stock} = await productsTrData(dataID);
        this.setState({data: stock.data});
    }

    /**
     * Table Component Handle
     */
    columns = () => {
        return [
            ...productsTrColumn()
        ];
    }

    options = (file_name) => {
        return {
            filterType: config.filter,
            responsive: config.responsive,
            selectableRows: 'none',
            filter: true,
            fixedHeader:true,
            rowsPerPageOptions: config.pagination,
            rowsPerPage: config.row_per_page,
            downloadOptions: {
                filename: file_name,
                filterOptions: {
                    useDisplayedColumnsOnly: true,
                    useDisplayedRowsOnly: true
                }
            }
        };
    }
    /**
    * /Table Component Handle
    */

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Stock Transaction List" header="Stock Transaction List">
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/products/list" ><b><i className="icon-undo2"></i></b>Back</Link></p>

                    <MUIDataTable
                        title={"Stock Transaction List"}
                        data={this.state.data}
                        columns={this.columns()}
                        options={this.options('stock_transaction_list.csv')}
                    />
                </Main>
            </React.Fragment>
         );
    }
}
 
export default ProductTransaction;