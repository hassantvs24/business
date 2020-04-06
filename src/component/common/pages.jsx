import { Component } from 'react';
import Joi from 'joi-browser';
import {toast} from 'react-toastify';
import config from './../../config/index';

class Pages extends Component {

    state = { 
        data:[],
        searchQuery:"",
        inputFiled: {},
        errors: {}
     }

    /**
     * Form Validation Method
     */
     validate = () => {
        const options = {abortEarly: false};
        const result = Joi.validate(this.state.inputFiled, this.schema, options);

        if(!result.error) return null;

        const errors = {};
        for(let item of result.error.details) errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;

    }

    handleInput = ({currentTarget: input}) => {

        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const inputFiled = {...this.state.inputFiled}
        inputFiled[input.name] = input.value;
        this.setState({inputFiled, errors});
    }

    handleSubmit = e =>{
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        
        if(errors) return;

        this.doSubmit();

        console.log(this.state.data);

    }


    handleCloseModal = () => {
        document.getElementById("addClose").click();
        document.getElementById("ediClose").click();
    }

    /**
     * /Form Validation Method
     */

    /**
     * Table Manage Method
     */

    filterColumn = () => {
        let columns = this.tblTemplate;
         columns = this.tblTemplate.filter(e => {
            return e.isFilter === true;
          });

          let sendValue = columns.map( i => {
            return  {label: i.name, value: i.selector }
          });

          return sendValue;
    }

    getExportData = () => {

        let columns = this.tblTemplate;
         columns = this.tblTemplate.filter(e => {
            return e.isExport === true;
          });

          let sendValue = columns.map( i => {
            return  {label: i.name, value: i.selector }
          });

          return sendValue;
    }

    delData = id => {
        const originalData = this.state.data;
        const data = originalData.filter(m => m.id !== id);
 
        if(window.confirm(config.confirmDel)){
             this.setState({data});
             toast.success(config.del);
        }
 
      }

      handleBulkDelete = () => {
        const {bulkDelete, data} = this.state; 

        if(bulkDelete.length <= 0) return;

        let originalData = data;
        let setDatas = bulkDelete.map(id => {
           originalData = originalData.filter(m => m.id !== id);
           return originalData;
       });

       let setData = [];
       setDatas.forEach(el => {
           setData = el;
       });

       if(window.confirm(config.confirmDel)){
           this.setState({bulkDelete:[], data: setData});
           toast.success(config.del);
       }
    }

    handleSearch = query => {
        this.setState({searchQuery: query})
    }

    searchColumn = query => {
        this.setState({selectColumn: query})
    }

    handleChange = state  => {
        const selectedData = state.selectedRows;
        const selectedID = selectedData.map(m => {
           return m.id;
        });

        this.setState({bulkDelete: selectedID})
        //console.log(state.selectedRows);
      };

    getPageData = () => {
        const {searchQuery, data, selectColumn} = this.state;
        let filtered = data;
        if(searchQuery)
        filtered = data.filter(m => 
            m[selectColumn].toLowerCase().startsWith(searchQuery.toLowerCase())
        );

     return {filtered};

    }

     /**
     * /Table Manage Method
     */
     
}
 
export default Pages;