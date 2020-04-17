import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {getProductCategory, saveProductCategory} from '../../../model/productCategoryModel';

class ProductCategoryAction extends Forms {
    state = { 
        data: {
            name:'', 
            code: ''
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().min(3).required().label('Category Product Name'),
        code: Joi.any()
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await getProductCategory(dataID);
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
            await saveProductCategory(this.state.data);
            toast.success(config.save);
            this.props.history.push("/products/category");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Product Category Form" header="Product Category Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/products/category" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderInput('name', 'Product Category Name', 'text', true)}
                            {this.renderInput('code', 'Product Category Code', 'text')}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default ProductCategoryAction;