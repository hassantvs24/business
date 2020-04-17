import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {supplierCategoryGet, supplierCategorySave} from '../../../model/supplierCategoryModel';


class SupplierCategoryAction extends Forms {
    state = { 
        data: {
            name:'', 
            code: ''
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().max(191).required().label('Name'),
        code: Joi.string().min(4).max(191).required().label('Category Code')
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await supplierCategoryGet(dataID);
            this.setState({data: this.dataShape(getData.data)});
        }catch (ex){
            if(ex.response && ex.response.status === 404) 
              return this.props.history.replace("/not-found");
        }
        
    }

     dataShape = shape => {
        return {
            id: shape.id, 
            name: shape.name, 
            code: shape.code
        }
    }

     doSubmit = async () => {
         try{
            await supplierCategorySave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/suppliers/category");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Sup[plier Category Form" header="Sup[plier Category Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/suppliers/category" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderInput('code', 'Category Code', 'text', true)}
                            {this.renderInput('name', 'Category Name', 'text', true)}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default SupplierCategoryAction;