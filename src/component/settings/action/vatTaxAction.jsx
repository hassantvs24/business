import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {vatTaxGet, vatTaxSave} from '../../../model/vatTaxModel';


class VatTaxAction extends Forms {
    state = { 
        data: {
            name:'', 
            amount: ''
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().max(191).required().label('Name'),
        amount: Joi.number().min(0).required().label('Tax Rate'),
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await vatTaxGet(dataID);
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
            await vatTaxSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/settings/vat-tax");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Vat Tax Setup Form" header="Vat Tax Setup Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/settings/vat-tax" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

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
 
export default VatTaxAction;