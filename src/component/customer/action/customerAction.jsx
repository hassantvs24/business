import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {customerGet, customerSave} from '../../../model/customerModel';
import {findLoc} from '../../../model/zoneModel';


class CustomerAction extends Forms {
    state = { 
        data: {
            name:'', 
            amount: ''
        },

        options: {
            productType: [{ value: '', label: 'Select Product Type' }],
            productCategories: [{ value: '', label: 'Select Product Category' }],
            brand: [{ value: '', label: 'Select Product Brand' }],
            company: [{ value: '', label: 'Select Product Companies' }],
            units: [{ value: '', label: 'Select Product Units' }],
        },

        defaultSelect: {
            product_type: { value: '', label: 'Select Product Type' },
            product_categories_id: { value: '', label: 'Select Product Category' },
            brands_id: { value: '', label: 'Select Product Brand' },
            companies_id: { value: '', label: 'Select Product Companies' },
            units_id: { value: '', label: 'Select Product Units' }
        },

        errors: {}
     }

     schema = {
        id: Joi.number(),
        name: Joi.string().max(191).required().label('Name'),
        amount: Joi.number().min(0).required().label('Tax Rate'),
    }

    async componentDidMount(){

        const {data: division} = await findLoc();

        this.findDivision(division.data);
        

        this.populateData();
    }

    findDivision = (union) =>{
        /*  
            division: "Sylhet"
            division_id: 5
            id: 4541
            name: "Sylhet City"
            upazilla: "Sylhet Sadar"
            upazilla_id: 281
            zilla: "Sylhet"
            zilla_id: 36
            
        */

      // const unique = [...new Set(union.map(item => item.division))];

        console.log(union);
    }

    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await customerGet(dataID);
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
            amount: shape.amount
        }
    }

     doSubmit = async () => {
         try{
            await customerSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/settings/vat-tax");
         }catch(ex){
            toast.error(config.error);
         }
    }

    render() { 
        const {product_type, product_categories_id, brands_id, companies_id, units_id} = this.state.defaultSelect;
        const {productType, productCategories, brand, company, units} = this.state.options;

        return ( 
            <React.Fragment>
                <Main title="Customer Setup Form" header="Customer Setup Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/settings/vat-tax" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderSelectTwo('divisions_id', 'Division',  productType, product_type, true)}
                            {this.renderSelectTwo('zillas_id', 'District',  productType, product_type, true)}
                            {this.renderSelectTwo('upa_zillas_id', 'Sub-District',  productType, product_type, true)}
                            {this.renderSelectTwo('unions_id', 'Union',  productType, product_type, true)}

                            {this.renderInput('name', 'Name', 'text', true)}
                            {this.renderNumInput('amount', 'Tax Rate')}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default CustomerAction;