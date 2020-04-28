import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {warehouseGet, warehouseSave} from '../../../model/warehouseModel';


class WarehouseAction extends Forms {
    state = { 
        data: {
            name:'', 
            contact: '',
            contact_alternate: '',
            phone: '',
            address: '',
            email: '',
            website: '',
            proprietor: '',
            logo: null
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().max(191).required().label('Name'),
        contact: Joi.string().max(15).required().label('Contact'),
        contact_alternate: Joi.any().label('Alternate Contact'),
        phone: Joi.any().label('Phone Number'),
        address: Joi.string().max(191).required().label('Address'),
        email: Joi.any().label('Email'),
        website: Joi.any().label('Website'),
        proprietor: Joi.string().max(191).required().label('Proprietor Name'),
        logo: Joi.any()
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await warehouseGet(dataID);
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
            contact: shape.contact,
            contact_alternate: shape.contact_alternate,
            phone: shape.phone,
            address: shape.address,
            email: shape.email,
            website: shape.website,
            proprietor: shape.proprietor,
            logo: shape.logo
        }
    }

     doSubmit = async () => {
         try{
            await warehouseSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/settings/warehouse");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Warehouse Form" header="Warehouse Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/settings/warehouse" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderInput('name', 'Name', 'text', true)}
                            {this.renderInput('proprietor', 'Proprietor Name', 'text', true)}
                            {this.renderInput('contact', 'Contact Number', 'text', true)}
                            {this.renderInput('address', 'Address', 'text', true)}
                            {this.renderInput('contact_alternate', 'Alternate Contact', 'text')}
                            {this.renderInput('phone', 'Phone Number', 'text')}
                            {this.renderInput('email', 'Email', 'email')}
                            {this.renderInput('website', 'Website', 'text')}
                            {this.renderFileUpload('logo', 'Logo Upload', 'image/x-png,image/jpeg')}
                            {this.renderSubmit()}

                            <div><img src={this.state.data.logo} alt="no found" /></div>
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default WarehouseAction;