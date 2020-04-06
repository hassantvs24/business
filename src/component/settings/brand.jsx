import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Main from '../common/main';
import RowAction from './../common/rowAction';
import bandModal from './../../model/brandModel';
import config from './../../config';

class Brands extends Component {
    state = { 
        data: bandModal.brandData(),

        inputFiled: {
            id: '',
            title: '',
            year: ''
        },

        errors: {}
     }
    

     columns = () => {
        return [
            { name: "name", label: "Name", options: {
                filter: true,
                sort: true,
             }},

            { name: "position", label: "Position",options: {
                filter: true,
                sort: true,
             }},

            { name: "office", label: "Office",options: {
                filter: true,
                sort: true,
             }},

            { name: "date", label: "Start date", options: {
                filter: true,
                sort: true,
            }},

            { name: "salary", label: "Salary", options: {
                filter: true,
                sort: true,
            }}
           ];
    }

    downloadData = () => {
        alert('hello');
    }


    options = (file_name) => {
        return {
            filterType: "dropdown",
            responsive: 'scrollFullHeight',
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
            //onDownload: this.downloadData()
        };
    }


    render() { 
        return ( 
            <React.Fragment>
                <Main title="Brands" header="Brands">
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