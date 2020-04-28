import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {accountGet, accountSave} from '../../../model/accountModel';


class AccountAction extends Forms {
    state = { 
        data: {
            name:'', 
            account_number: '',
            description: ''
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().max(191).required().label('Account Name'),
        account_number: Joi.any().label('Account Number'),
        description: Joi.any().label('Account Details'),
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await accountGet(dataID);
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
            account_number: shape.account_number,
            description: shape.description
        }
    }

     doSubmit = async () => {
         try{
            await accountSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/accounts/list");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Account Setup Form" header="Account Setup Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/accounts/list" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderInput('name', 'Account Name', 'text', true)}
                            {this.renderInput('account_number', 'Account Number')}
                            {this.renderInput('description', 'Account Details')}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default AccountAction;