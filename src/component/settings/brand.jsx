import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import {toast} from 'react-toastify';
import Main from '../common/main';
import RowAction from './../common/rowAction';
import bandModal from './../../model/brandModel';
import config from './../../config';
import { Link } from 'react-router-dom';


class Brands extends Component {
    state = { 
        data: [],
        inputFiled: {
            id: '',
            title: '',
            year: ''
        },
        selectedCell: '',
        errors: {}
     }

     componentDidMount(){
         const data = bandModal.brandData();
         this.setState({data});
     }
    
/**
 * Table Component Handle
 */
     columns = () => {
        return [
            ...bandModal.brandColumn(),
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
                            <li><Link  to={`/settings/brands/${this.state.selectedCell}`}><i className="icon-pencil5"></i> Edit</Link></li>
                            <li><span onClick={() => {this.handleDelete([this.state.selectedCell])} } ><i className="icon-bin"></i> Delete</span></li>
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
            onRowsDelete: ({data: rowIndex}) => {
                const rows = rowIndex.map(selected => {return selected.dataIndex;});
                this.handleDelete(rows);
                return false; //Block Default table body content
            },

            onRowClick: (rowData, rowMeta) => {
                this.setState({selectedCell: rowMeta.dataIndex});
            }
        };
    }
/**
 * /Table Component Handle
 */

    handleDelete = (rows) => {
        const {data: originalData} = this.state;
        rows.forEach(e => delete originalData[e]);//Delete by filtered index
        const data = originalData.filter(Boolean); //Remove empty array
        this.setState({data});
        toast.success(config.del);
    }


    render() { 

        return ( 
            <React.Fragment>
               
                <Main title="Brands" header="Brands">
                    <p><Link  className="btn btn-primary btn-labeled" to="/settings/brands/new" ><b><i className="icon-file-plus"></i></b>Add New Brand</Link></p>

                    <MUIDataTable
                        title={"Brand List"}
                        data={this.state.data}
                        columns={this.columns()}
                        options={this.options('brands_list.csv')}
                    />
                </Main>
            </React.Fragment>
        );
    }
}
 
export default Brands;