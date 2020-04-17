import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {shipmentGet, shipmentSave} from '../../../model/shipmentModel';


class ShipmentAction extends Forms {
    state = { 
        data: {
            name:'', 
            description: '',
            shipping_company: ''
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().max(191).required().label('Name'),
        description: Joi.any(),
        shipping_company: Joi.any(),
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await shipmentGet(dataID);
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
            description: shape.description,
            shipping_company: shape.shipping_company
        }
    }

     doSubmit = async () => {
         try{
            await shipmentSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/settings/shipment");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Shipment Setup Form" header="Shipment Setup Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/settings/shipment" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderInput('name', 'Name', 'text', true)}
                            {this.renderInput('description', 'Description', 'text')}
                            {this.renderInput('shipping_company', 'Shipping Company', 'text')}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default ShipmentAction;