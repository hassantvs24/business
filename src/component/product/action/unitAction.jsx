import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {unitGet, unitSave} from '../../../model/productUnitModel';

class UnitAction extends Forms {
    state = { 
        data: {
            name:'', 
            full_name: ''
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().max(30).required().label('Unit Short Name'),
        full_name: Joi.string().max(150).required().label('Unit Full Name'),
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await unitGet(dataID);
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
            full_name: shape.full_name
        }
    }

     doSubmit = async () => {
         try{
            await unitSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/products/units");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Product Unit Form" header="Product Unit Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/products/units" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderInput('name', 'Short Name', 'text', true)}
                            {this.renderInput('full_name', 'Full Name', 'text')}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default UnitAction;