import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {productsGet, productsSave} from '../../../model/productModel';
import {productCategoryData} from '../../../model/productCategoryModel';
import {brandData} from '../../../model/brandModel';
import {companyData} from '../../../model/companyModel';
import {unitData} from '../../../model/productUnitModel';



class ProductAction extends Forms {
    state = { 
        data: {
            name:'', 
            sku: '',
            sell_price: 0, 
            purchase_price: 0, 
            product_type:'',
            alert_quantity: 0, 
            description:'', 
            stock: 0, 
            product_categories_id:'', 
            brands_id:'', 
            companies_id:'', 
            units_id:''
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
        name: Joi.string().max(191).required().label('Product Name'),
        sku: Joi.string().min(4).max(191).required().label('SKU'),
        sell_price: Joi.number().min(0).required().label('Sell Price'),
        purchase_price: Joi.number().min(0).required().label('Purchase Price'),
        product_type: Joi.string().max(191).required().label('Product Type'),
        alert_quantity: Joi.number().min(0).required().label('Product Alert Quantity'),
        description: Joi.any().label('Product Description'),
        stock: Joi.number().min(0).required().label('Opening Stock'),
        product_categories_id: Joi.number().min(1).required().label('Product Category'),
        brands_id: Joi.any().label('Product Brand'),
        companies_id: Joi.any().label('Product Companies'),
        units_id: Joi.number().required().label('Product Unit')
    }

    async componentDidMount(){
         this.populateData();

         const productTypeData = [
            { id: 'Main', name: 'Main' },
            { id: 'Other', name: 'Other' }
        ];

        const {data: category} = await productCategoryData();
        const {data: brand} = await brandData();
        const {data: company} = await companyData();
        const {data: units} = await unitData();

        const productTypeShape = this.optionShape(productTypeData, 'Select Product Type');
        const productCategoryShape = this.optionShape(category.data, 'Select Product Type');
        const brandShape = this.optionShape(brand.data, 'Select Product Brand');
        const companyShape = this.optionShape(company.data, 'Select Product Company');
        const unitShape = this.optionShape(units.data, 'Select Product Units');

        const optionData = {
            productType: productTypeShape,
            productCategories: productCategoryShape,
            brand: brandShape,
            company: companyShape,
            units: unitShape
        }

        const {product_type, product_categories_id, brands_id, companies_id, units_id} = this.state.data;

        const setDefault = {
            product_type: this.getDefault(productTypeShape, product_type),
            product_categories_id: this.getDefault(productCategoryShape, product_categories_id),
            brands_id: this.getDefault(brandShape, brands_id),
            companies_id: this.getDefault(companyShape, companies_id),
            units_id: this.getDefault(unitShape, units_id)
        }

        this.setState({options: optionData, defaultSelect: setDefault});
    }


    populateData = async () => {
        try{

            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await productsGet(dataID);

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

     dataShape = shape => {
        return {
            id: shape.id, 
            name: shape.name, 
            sku: shape.sku, 
            sell_price: shape.sell_price, 
            purchase_price: shape.purchase_price, 
            product_type: shape.product_type,
            alert_quantity: shape.alert_quantity, 
            description: shape.description, 
            stock: shape.stock, 
            product_categories_id: shape.product_categories_id, 
            brands_id: shape.brands_id, 
            companies_id: shape.companies_id, 
            units_id: shape.units_id
        }
    }

    getDefault = (options, selected) => {
        return options.find(m => {
            return m.value === selected;
        });
    }


     doSubmit = async () => {
         try{
            await productsSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/products/list");
         }catch(ex){
            toast.error(config.error);
         }
    }


    render() { 
        const {product_type, product_categories_id, brands_id, companies_id, units_id} = this.state.defaultSelect;
        const {productType, productCategories, brand, company, units} = this.state.options;
        
        return ( 
            <React.Fragment>
                <Main title="Product Form" header="Product Form">
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/products/list" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        
                                        {this.renderSelectTwo('product_type', 'Product Type',  productType, product_type, true)}
                                        {this.renderInput('sku', 'SKU', 'text', true)}
                                        {this.renderInput('name', 'Name', 'text', true)}
                                        {this.renderSelectTwo('product_categories_id', 'Product Category', productCategories, product_categories_id, true)}
                                        {this.renderSelectTwo('brands_id', 'Product Brand', brand, brands_id)}
                                        {this.renderSelectTwo('companies_id', 'Product Company', company, companies_id)}
                                    </div>
                                    <div className="col-md-6">
                                        {this.renderSelectTwo('units_id', 'Product Unit', units, units_id, true)}
                                        {this.renderNumInput('sell_price', 'Sells Price', true)}
                                        {this.renderNumInput('purchase_price', 'Purchase Price', true)}
                                        {this.renderNumInput('stock', 'Opening Stock', true)}
                                        {this.renderNumInput('alert_quantity', 'Alert Quantity', true)}
                                        {this.renderInput('description', 'Product Description')}
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
 
export default ProductAction;