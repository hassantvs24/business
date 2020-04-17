import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import {toast} from 'react-toastify';
import Main from '../common/main';
import RowAction from '../common/rowAction';
import {customerCategoryData, customerCategoryColumn, customerCategoryDel} from '../../model/customerCategoryModel';
import config from '../../config/index';
import { Link } from 'react-router-dom';

class CustomerCategory extends Component {
    state = { 
        data: [],
        selectedID: '',
        errors: {}
     }

    async componentDidMount(){
        const {data: customerCategory} = await customerCategoryData();
        this.setState({data: customerCategory.data});
    }

    /**
     * Table Component Handle
     */
    columns = () => {
        return [
            ...customerCategoryColumn(),
            {
                name: "Action",
                options: {
                    viewColumns: false,
                    searchable: false,
                    filter: false,
                    sort: false,
                    empty: true,
                    print: false,
                    download: false,
                    setCellHeaderProps: (value) => {
                        return {style: {textAlign: 'right'}}
                    },
                    setCellProps: (value) => {
                        return {style: {textAlign: 'right'}}
                    },
                    customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <RowAction> 
                            <li><Link  to={`/customers/category/${this.state.selectedID}`}><i className="icon-pencil5"></i> Edit</Link></li>
                            <li><span onClick={() => {this.handleDelete(this.state.selectedID)} } ><i className="icon-bin"></i> Delete</span></li>
                        </RowAction>
                    );
                    }
                }
            }
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
            },

            onRowClick: (rowData, rowMeta) => {
                const mainData = this.state.data;
                const id = mainData[rowMeta.dataIndex].id;//Getting Database ID
                this.setState({selectedID: id});
            }
        };
    }
    /**
    * /Table Component Handle
    */

    handleDelete = async (id) => {
        const {data: originalData} = this.state;

        const filterData = originalData.filter(m => m.id !== id);
        this.setState({data:filterData});

        try{
            await customerCategoryDel(id);
            toast.success(config.del);
        }catch(ex){
            if(ex.response && ex.response.status === 404)
            toast.error(config.error);
            this.setState({data: originalData});
        }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Customer Category" header="Customer Category">
                    <p><Link  className="btn btn-primary btn-labeled" to="/customers/category/new" ><b><i className="icon-file-plus"></i></b>Add New Customer Category</Link></p>

                    <MUIDataTable
                        title={"Customer Category List"}
                        data={this.state.data}
                        columns={this.columns()}
                        options={this.options('customer_category_list.csv')}
                    />
                </Main>
            </React.Fragment>
         );
    }
}
 
export default CustomerCategory;