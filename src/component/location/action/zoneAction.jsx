import React from 'react';
import {toast} from 'react-toastify';
import config from '../../../config/index';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import {zoneGet, zoneSave} from '../../../model/zoneModel';

class ZoneAction extends Forms {
    state = { 
        data: {
            name:'', 
            address: ''
        },
        errors: {}
     }
     
     schema = {
        id: Joi.number(),
        name: Joi.string().min(3).required().label('Zone Name'),
        address: Joi.any().label('Zone Address')
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = async () => {
        try{
            const dataID = this.props.match.params.id;
            if(dataID === "new") return;
    
            const {data: getData} = await zoneGet(dataID);
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
            address: shape.address
        }
    }

     doSubmit = async () => {
         try{
            await zoneSave(this.state.data);
            toast.success(config.save);
            this.props.history.push("/location/zone");
         }catch(ex){
            toast.error(config.error);
         }

    }

    render() { 
        return ( 
            <React.Fragment>
                <Main title="Zone Form" header="Zone Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/location/zone" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div className="panel panel-flat">
                                
                            <div className="panel-body">

                            {this.renderInput('name', 'Zone Name', 'text', true)}
                            {this.renderInput('address', 'Zone Address', 'text')}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default ZoneAction;