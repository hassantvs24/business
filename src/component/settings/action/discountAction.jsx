import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {discountGet, discountSave} from '../../../model/discountModel';


class DiscountAction extends Forms {
    state = { 
        data: {
            name:'', 
            amount: '',
            discount_type: '',
            apply_only: 'General'
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().max(191).required().label('Name'),
        amount: Joi.number().min(0).required().label('Discount Rate'),
        discount_type: Joi.string().required().label('Discount Type'),
        apply_only: Joi.any(),
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await discountGet(dataID);
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
            amount: shape.amount,
            discount_type: shape.discount_type,
            apply_only: shape.apply_only,
        }
    }

     doSubmit = async () => {
         console.log(this.state.data);
         try{
            await discountSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/settings/discount");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        const options = [
            { value: '',  label: 'Select Discount Type' },
            { value: 'Fixed', label: 'Fixed Amount' },
            { value: 'Percentage', label: 'Percentage (%)' }
          ];
        return ( 
            <React.Fragment>
                <Main title="Vat Tax Setup Form" header="Vat Tax Setup Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/settings/discount" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">
                            {this.renderHidden('apply_only')}
                            {this.renderSelect('discount_type', 'Discount Type',  options, true)}
                            {this.renderInput('name', 'Name', 'text', true)}
                            {this.renderNumInput('amount', 'Discount Rate')}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default DiscountAction;