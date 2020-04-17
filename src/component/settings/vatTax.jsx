import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import {toast} from 'react-toastify';
import Main from '../common/main';
import RowAction from '../common/rowAction';
import {vatTaxData, vatTaxColumn, vatTaxDel} from '../../model/vatTaxModel';
import config from '../../config/index';
import { Link } from 'react-router-dom';

class VatTax extends Component {
    state = { 
        data: [],
        selectedID: '',
        errors: {}
     }

    async componentDidMount(){
        const {data: vatTax} = await vatTaxData();
        this.setState({data: vatTax.data});
    }

    /**
     * Table Component Handle
     */
    columns = () => {
        return [
            ...vatTaxColumn(),
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
                            <li><Link  to={`/settings/vat-tax/${this.state.selectedID}`}><i className="icon-pencil5"></i> Edit</Link></li>
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
            await vatTaxDel(id);
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
                <Main title="Vat Tax Setup" header="Vat Tax Setup">
                <p><Link  className="btn btn-primary btn-labeled" to="/settings/vat-tax/new" ><b><i className="icon-file-plus"></i></b>Add New Vat/Tax</Link></p>

                <MUIDataTable
                    title={"Vat Tax Rate List"}
                    data={this.state.data}
                    columns={this.columns()}
                    options={this.options('vat_tax_rate_list.csv')}
                />
                </Main>
            </React.Fragment>
         );
    }
}
 
export default VatTax;