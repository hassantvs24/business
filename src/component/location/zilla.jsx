import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
//import {toast} from 'react-toastify';
import Main from '../common/main';
//import RowAction from '../common/rowAction';
import {zillaData, zillaColumn} from '../../model/zillaModel';
import config from '../../config/index';
//import { Link } from 'react-router-dom';

class Zilla extends Component {

    state = { 
        data: [],
        selectedID: '',
        errors: {}
     }

     async componentDidMount(){
        const {data: division} = await zillaData();
        this.setState({data: division.data});
    }


    /**
     * Table Component Handle
     */
    columns = () => {
        return [
            ...zillaColumn()
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
                <Main title="Zilla" header="Zilla">
                    <MUIDataTable
                        title={"Zilla List"}
                        data={this.state.data}
                        columns={this.columns()}
                        options={this.options('zilla_list.csv')}
                    />
                </Main>
            </React.Fragment>
         );
    }
}
 
export default Zilla;