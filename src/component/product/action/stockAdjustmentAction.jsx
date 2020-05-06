import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {stockAdjustmentGet, stockAdjustmentSave} from '../../../model/stockAdjustmentModel';
import {productsData} from '../../../model/productModel';
import {warehouseData} from '../../../model/warehouseModel';
import Select from 'react-select';


class StockAdjustmentAction extends Forms {
    state = { 
        data: {
            code:'', 
            recover_amount: 0,
            description: '',
            itemSelect: 0,
            itemQty: 1,
            warehouses_id: ''
        },
        
        errors: {},

        items:[],

        warehouse: [{ value: '', label: 'Select Warehouse' }],

        options: {
            products: [{ value: '', label: 'Select Product' }]
        },

        defaultSelect: { value: '', label: 'Select Product' },

        productData: {}
     }
     
     schema = {
        id: Joi.number(),
        code: Joi.string().min(4).max(191).required().label('Reference Code'),
        recover_amount: Joi.number().min(0).required().label('Recover Amount'),
        description: Joi.any().label('Adjustment Note'),
        itemSelect: Joi.number().min(1).required(),
        itemQty: Joi.number().min(1).required(),
        warehouses_id:  Joi.number().min(1).required().label('Warehouse Select'),
    }

    async componentDidMount(){
        const {data: products} = await productsData();
        const {data: warehouses} = await warehouseData();
        const warehouseShape = this.optionWarehouseShape(warehouses.data, 'Select Warehouse');
        const productShape = this.optionShape(products.data, 'Select Product');
        const optionData = {
            products: productShape
        }
        const data = {...this.state.data};
        data['warehouses_id'] = this.props.user.warehouses_id;
         this.populateData();
         this.setState({data, options: optionData, warehouse: warehouseShape, productData: products.data});
    }

    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await stockAdjustmentGet(dataID);
            const items = getData.data[0].stock_adjustment_items;
            this.setState({data: this.dataShape(...getData.data), items: this.itemShape(items)});
        }catch (ex){
            if(ex.response && ex.response.status === 404) 
              return this.props.history.replace("/not-found");
        }
    }

    productOptionRemoveFilter = ()  => {
        const options = this.state.options.products;
        const items = this.state.items;
        const results = options.filter( option => !items.some( item => option.value === item.id));
        //console.log(results);
        this.setState({options: {products: results}});
    }


     dataShape = shape => {
        return {
            id: shape.id, 
            code: shape.code, 
            recover_amount: shape.recover_amount,
            description: shape.description,
            warehouses_id: shape.warehouses_id,
            itemSelect: 1,
            itemQty: 1
        }
    }

    itemShape = items => {
        const sendShape = items.map(data => {
            return {id: data.products_id,  name: data.name, sku: data.sku, quantity: data.quantity, adjustment_action: data.adjustment_action, amount: data.amount, unit: data.unit };
        });

       return sendShape;
    }

    optionShape = (shape, defaultVal=null) => {
        const sendShape = shape.map(data => {
            return {value: data.id,  label: `${data.sku}-${data.name}`}
        });
        (defaultVal && sendShape.unshift({value: '',  label: defaultVal}));
        return sendShape;
    }

    optionWarehouseShape = (shape, defaultVal=null) => {
        const sendShape = shape.map(data => {
            return {value: data.id,  label: data.name}
        });
        (defaultVal && sendShape.unshift({value: '',  label: defaultVal}));
        return sendShape;
    }

    handleItemSelect = val =>{
        
        const productID = val.value;
        if(productID === '') return;
        const data = {...this.state.data};
        const products = this.state.productData;
        const product = products.filter(e => e.id === productID);
        const p = product[0];
        const items = [...this.state.items, {id: p.id, name: p.name, sku: p.sku, quantity: 1, adjustment_action: 'OUT', amount: p.purchase_price, unit: p.unit}];
        data['itemSelect'] = items.length;
        this.productOptionRemoveFilter(productID);
        

        this.setState({data, items});
    }

    handleDelItem = async (val) =>{
        const data = {...this.state.data};
        const selectItem = this.state.items;
        const productsData = this.state.productData;
        const remainItem = selectItem.filter(item => item.id !== val);
        const product = productsData.filter(e => e.id === val);
        const productShape = this.optionShape(product);
        const options = [ ...this.state.options.products, ...productShape];
        data['itemSelect'] = remainItem.length;

        await this.setState({options: {products: options}, data, items: [...remainItem]});
        await this.checkInvalidQuantity();
    }

    handleItemInput = ({currentTarget: input}) => {
      const items = this.state.items;
      items.forEach((element, index) => {
            if(element.id === parseInt(input.id)) {
                items[index][input.name] = (input.name === 'quantity'?  Number(input.value) : input.value);
            }
        });

      this.checkInvalidQuantity();

      this.setState({items});

    }

    checkInvalidQuantity = () => {
        const data = {...this.state.data};
        const items = this.state.items;
        const check = items.find(val => parseInt(val.quantity) === 0);

        if(Boolean(check)){
          data['itemQty'] = 0;
        }else{
          data['itemQty'] = 1;
        }
        
        this.setState({data});
    }

    doSubmit = async () => {
        try{
            const data = {...this.state.data, items: this.state.items };
            console.log(data);
           await stockAdjustmentSave(data);
           toast.success(config.save);
           this.props.history.push("/products/stock-adjustment");
        }catch(ex){
           toast.error(config.error);
        }
   }

    render() { 
        const defaultSelect = this.state.defaultSelect;
        const {products} = this.state.options;
        const selectItem = this.state.items;

        return ( 
            <React.Fragment>
                <Main title="Stock Adjustment Form" header="Stock Adjustment Form">
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/products/stock-adjustment" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                                <div className="row">
                                    <div className="col-md-6">
                                        {this.renderInput('code', 'Reference Code', 'text', true)}
                                        {this.renderNumInput('recover_amount', 'Recover Amount', true)}
                                    </div>
                                    <div className="col-md-6">
                                        {this.renderSelect('warehouses_id', 'Select Warehouse',  this.state.warehouse, true)} 
                                        {this.renderInput('description', 'Note', 'text')}
                                    </div>
                                </div>
                                <div className="row" onMouseOver={this.productOptionRemoveFilter}>
                                    <div className="col-md-8 col-md-offset-2">
                                        <div className="input-group">
                                            <span className="input-group-addon" id="basic-addon1">@</span>
                                            <Select onChange={this.handleItemSelect} name="products_id" value={defaultSelect}  options={products}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12" style={{ margin: '25px auto 25px auto' }}>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>SKU</th>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Action</th>
                                                    <th className="text-right"><i className="icon-bin"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                  {selectItem.map( item => (
                                                     <tr key={item.id}>
                                                         <td>{item.sku}</td>
                                                         <td>{item.name}</td>
                                                         <td><input className="form-control" id={item.id} name="quantity" type="number" onBlur={this.handleItemInput} step="any" min="0" defaultValue={item.quantity} /></td>
                                                         <td>
                                                             <select className="form-control" id={item.id}  name="adjustment_action" onChange={this.handleItemInput}  defaultValue={item.adjustment_action} >
                                                                 <option value="OUT">Subtraction (-)</option>
                                                                 <option value="IN">Addition (+)</option>
                                                             </select>
                                                         </td>
                                                         <td className="text-right"><button type="button" onClick={() => this.handleDelItem(item.id)} className="btn btn-danger btn-xs"><i className="icon-bin"></i></button></td>
                                                     </tr>
                                                 ))}  
                                            </tbody>

                                        </table>
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
 
export default StockAdjustmentAction;