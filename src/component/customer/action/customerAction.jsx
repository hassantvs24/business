import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {customerGet, customerSave} from '../../../model/customerModel';
import {findLoc, zoneData} from '../../../model/zoneModel';
import {customerCategoryData} from '../../../model/customerCategoryModel';
import {warehouseData} from '../../../model/warehouseModel';


class CustomerAction extends Forms {
    state = { 
        data: {
            name:'', 
            code: '',
            address: '',
            email: '',
            contact: '',
            phone: '',
            alternate_contact: '',
            description: '',
            credit_limit: 0,
            balance: 0,
            sells_target: 0,
            divisions_id: '',
            zillas_id: '',
            upa_zillas_id: '',
            unions_id: '',
            zones_id: '',
            customer_categories_id: '',
            warehouses_id: ''
        },

        options: {
            warehouse: [{ value: '', label: 'Select Warehouse' }],
            category: [{ value: '', label: 'Select Customer Category' }],
            zones: [{ value: '', label: 'Select Division' }],
            divisions: [{ value: '', label: 'Select Division' }],
            zillas: [{ value: '', label: 'Select Districts' }],
            upaZillas: [{ value: '', label: 'Select Sub-Districts' }],
            unions: [{ value: '', label: 'Select Unions' }]
        },

        defaultSelect: {
            warehouses_id: { value: '', label: 'Select Warehouse' },
            customer_categories_id: { value: '', label: 'Select Customer Category' },
            zones_id: { value: '', label: 'Select Division' },
            divisions_id: { value: '', label: 'Select Division' },
            zillas_id: { value: '', label: 'Select Districts' },
            upa_zillas_id: { value: '', label: 'Select Sub-Districts' },
            unions_id: { value: '', label: 'Select Unions' }
        },

        errors: {}
     }

     schema = {
        id: Joi.number(),
        code: Joi.string().max(191).required().label('Customer Reference Code'),
        name: Joi.string().max(191).required().label('Customer Name'),
        contact: Joi.string().min(11).max(11).required().label('Contact Number'),
        credit_limit: Joi.number().required().label('Credit Limit'),
        balance: Joi.number().required().label('Opening Balance'),
        sells_target: Joi.number().required().label('Sells Target'),
        address:  Joi.any(),
        email: Joi.any(),
        phone: Joi.any(),
        alternate_contact: Joi.any(),
        description: Joi.any(),
        customer_categories_id: Joi.number().required().label('Select Customer Category'),
        zones_id: Joi.number().required().label('Select Zone'),
        divisions_id: Joi.number().required().label('Select Division'),
        zillas_id: Joi.number().required().label('Select Districts'),
        upa_zillas_id: Joi.number().required().label('Select Sub-Districts'),
        unions_id: Joi.number().required().label('Select Unions'),
        warehouses_id:  Joi.number().min(1).required().label('Warehouse Select')
    }

    async componentDidMount(){

        const {data: division} = await findLoc();
        const {data: category} = await customerCategoryData();
        const {data: zone} = await zoneData();
        const {data: warehouse} = await warehouseData();

        const zoneShape = this.optionShape(zone.data, 'Select Zone');
        const categoryShape = this.optionShape(category.data, 'Select Customer Category');
        const warehouseShape = this.optionShape(warehouse.data, 'Select Warehouse');

        const optionData = {
            zones: zoneShape,
            category: categoryShape,
            warehouse: warehouseShape,
            divisions: division.data
        }

        const {divisions_id, zones_id, customer_categories_id} = this.state.data;

        const setDefault = {
            warehouses_id: this.getDefault(warehouseShape, this.props.user.warehouses_id),
            zones_id: this.getDefault(zoneShape, zones_id),
            customer_categories_id: this.getDefault(categoryShape, customer_categories_id),
            divisions_id: this.getDefault(division.data, divisions_id)
        }

        const data = {...this.state.data};
        data['warehouses_id'] = this.props.user.warehouses_id;

        this.populateData();

        this.setState({data, options: optionData, defaultSelect: setDefault});

        
    }

    async componentWillUpdate (nextProps, nextData){
       const {divisions_id, zillas_id, upa_zillas_id, zones_id, customer_categories_id, warehouses_id} = this.state.data;

        if(nextData.data.divisions_id !== divisions_id){

            const {data: warehouse} = await warehouseData();
            const {data: category} = await customerCategoryData();
            const {data: zone} = await zoneData();
            const {data: division} = await findLoc();
            const {data: zilla} = await findLoc('zillas', nextData.data.divisions_id);

            const zoneShape = this.optionShape(zone.data, 'Select Zone');
            const categoryShape = this.optionShape(category.data, 'Select Customer Category');
            const warehouseShape = this.optionShape(warehouse.data, 'Select Warehouse');

            const setDefault = {
                warehouses_id: this.getDefault(warehouseShape, warehouses_id),
                customer_categories_id: this.getDefault(categoryShape, customer_categories_id),
                zones_id: this.getDefault(zoneShape, zones_id),
                divisions_id: this.getDefault(division.data, nextData.data.divisions_id),
            }
       
            const optionData = {
                warehouse: warehouseShape,
                category: categoryShape,
                zones: zoneShape,
                divisions: division.data,
                zillas: zilla.data
            }
            this.setState({options: optionData, defaultSelect: setDefault});
        }

        if(nextData.data.zillas_id !== zillas_id){

            const {data: warehouse} = await warehouseData();
            const {data: category} = await customerCategoryData();
            const {data: zone} = await zoneData();
            const {data: division} = await findLoc();
            const {data: zilla} = await findLoc('zillas', divisions_id);
            const {data: upaZilla} = await findLoc('upa_zillas', nextData.data.zillas_id);

            const zoneShape = this.optionShape(zone.data, 'Select Zone');
            const categoryShape = this.optionShape(category.data, 'Select Customer Category');
            const warehouseShape = this.optionShape(warehouse.data, 'Select Warehouse');

            const setDefault = {
                warehouses_id: this.getDefault(warehouseShape, warehouses_id),
                customer_categories_id: this.getDefault(categoryShape, customer_categories_id),
                zones_id: this.getDefault(zoneShape, zones_id),
                divisions_id: this.getDefault(division.data, divisions_id),
                zillas_id: this.getDefault(zilla.data, nextData.data.zillas_id),
            }
       
            const optionData = {
                warehouse: warehouseShape,
                category: categoryShape,
                zones: zoneShape,
                divisions: division.data,
                zillas: zilla.data,
                upaZillas: upaZilla.data
            }
            this.setState({options: optionData, defaultSelect: setDefault});
        }

        if(nextData.data.upa_zillas_id !== upa_zillas_id){

            const {data: warehouse} = await warehouseData();
            const {data: category} = await customerCategoryData();
            const {data: zone} = await zoneData();
            const {data: division} = await findLoc();
            const {data: zilla} = await findLoc('zillas', divisions_id);
            const {data: upaZilla} = await findLoc('upa_zillas', zillas_id);
            const {data: union} = await findLoc('unions', nextData.data.upa_zillas_id);

            const zoneShape = this.optionShape(zone.data, 'Select Zone');
            const categoryShape = this.optionShape(category.data, 'Select Customer Category');
            const warehouseShape = this.optionShape(warehouse.data, 'Select Warehouse');
       
            const setDefault = {
                warehouses_id: this.getDefault(warehouseShape, warehouses_id),
                customer_categories_id: this.getDefault(categoryShape, customer_categories_id),
                zones_id: this.getDefault(zoneShape, zones_id),
                divisions_id: this.getDefault(division.data, divisions_id),
                zillas_id: this.getDefault(zilla.data, zillas_id),
                upa_zillas_id: this.getDefault(upaZilla.data, nextData.data.upa_zillas_id),
            }

            const optionData = {
                warehouse: warehouseShape,
                category: categoryShape,
                zones: zoneShape,
                divisions: division.data,
                zillas: zilla.data,
                upaZillas: upaZilla.data,
                unions: union.data
            }
            this.setState({options: optionData, defaultSelect: setDefault});
        }

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

    optionShape = (shape, defaultVal=null) => {
        
        const sendShape = shape.map(data => {
            return {value: data.id,  label: data.name}
        });

        (defaultVal && sendShape.unshift({value: '',  label: defaultVal}));

        return sendShape;
    }

    
            /*name:'', 
            code: '',
            address: '',
            email: '',
            contact: '',
            phone: '',
            alternate_contact: '',
            description: '',
            credit_limit: 0,
            balance: 0,
            sells_target: 0,
            divisions_id: '',
            zillas_id: '',
            upa_zillas_id: '',
            unions_id: '',
            zones_id: '',
            customer_categories_id: '',
            warehouses_id: ''*/

     dataShape = shape => {
        return {
            id: shape.id, 
            code: shape.code,
            name: shape.name,
            email: shape.email,
            contact: shape.contact,
            alternate_contact: shape.alternate_contact,
            description: shape.description,
            credit_limit: shape.credit_limit,
            balance: shape.balance,
            sells_target: shape.sells_target,
            divisions_id: shape.divisions_id,
            zillas_id: shape.zillas_id,
            upa_zillas_id: shape.upa_zillas_id,
            unions_id: shape.unions_id,
            zones_id: shape.zones_id,
            customer_categories_id: shape.customer_categories_id,
            warehouses_id: shape.warehouses_id
        }
    }

    getDefault = (options, selected) => {
        return options.find(m => {
            return m.value === selected;
        });
    }

     doSubmit = async () => {
         try{
            await customerSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/customers/list");
         }catch(ex){
            toast.error(config.error);
         }
    }

    render() { 
        const {divisions_id, zillas_id, upa_zillas_id, unions_id, zones_id, customer_categories_id, warehouses_id} = this.state.defaultSelect;
        const {divisions, zillas, upaZillas, unions, zones, category, warehouse} = this.state.options;

        return ( 
            <React.Fragment>
                <Main title="Customer Setup Form" header="Customer Setup Form">
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/customers/list" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            <div className="row">
                                    <div className="col-md-6">
                                        {this.renderSelectTwo('warehouses_id', 'Select Warehouse',  warehouse, warehouses_id, true)}
                                        {this.renderSelectTwo('customer_categories_id', 'Select Category',  category, customer_categories_id, true)}
                                        {this.renderInput('code', 'Reference Code', 'text', true)}
                                        {this.renderInput('name', 'Customer Name', 'text', true)}
                                        {this.renderInput('contact', 'Contact Number', 'text', true)}
                                        {this.renderInput('email', 'Email Address', 'email')}
                                        {this.renderInput('alternate_contact', 'Alternate Contact')}
                                        {this.renderInput('address', 'Address')}
                                    </div>
                                    <div className="col-md-6">
                                        {this.renderNumber('credit_limit', 'Credit Limit', true, 'off', 'any', 0)}
                                        {this.renderNumber('balance', 'Opening Balance', true, 'off', 'any', 0)}
                                        {this.renderNumber('sells_target', 'Monthly Sells Target', true, 'off', 'any', 0)}
                                        {this.renderSelectTwo('zones_id', 'Zones',  zones, zones_id, true)}
                                        {this.renderSelectTwo('divisions_id', 'Division',  divisions, divisions_id, true)}
                                        {this.renderSelectTwo('zillas_id', 'District',  zillas, zillas_id, true)}
                                        {this.renderSelectTwo('upa_zillas_id', 'Sub-District',  upaZillas, upa_zillas_id, true)}
                                        {this.renderSelectTwo('unions_id', 'Union',  unions, unions_id, true)}
                                        {this.renderInput('description', 'Additional Note')}
                                    </div>
                                </div>
                            
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