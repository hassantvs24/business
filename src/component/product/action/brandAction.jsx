import React from 'react';
import {toast} from 'react-toastify';
import Joi from 'joi-browser';
import Main from '../../common/main';
import { Link } from 'react-router-dom';
import Forms from '../../common/forms';
import bandModal from '../../../model/brandModel';

class BrandAction extends Forms {
    state = { 
        data: {
            name: '', 
            position:'', 
            office: '', 
            age: '', 
            date: '', 
            salary: ''
        },
        errors: {}
     }
     
     schema = {
        name: Joi.string().min(3),
        position: Joi.string().required().min(3),
        office: Joi.string().required().min(3),
        age: Joi.number().required().min(18).max(100),
        date: Joi.date().required(),
        salary: Joi.number().required().min(0)
    }

    componentDidMount(){
        this.populateData();
    }


    populateData = () => {

        const dataID = this.props.match.params.id;
        if(dataID === "new") return;

        const data = bandModal.getBrand(dataID);
        this.setState({data: this.dataShape(data)});

     //   return this.props.history.replace("/not-found");
        
    }

     dataShape = shape => {
        return {
            name: shape.name, 
            position: shape.position, 
            office: shape.office, 
            age: shape.age, 
            date: shape.date,
            salary: shape.salary
        }
    }

     doSubmit = () => {
        //Call the server
        //await saveMovie(this.state.data);
        toast.success('Movies list are successfully updated.');
        this.props.history.push("/products/brands");
    }
    render() { 
      //console.log(this.props.match.params.id);
      
        return ( 
            <React.Fragment>
                <Main title="Brand Form" header="Brand Form" size={6}>
                    <p><Link title="Go Back" className="btn btn-danger btn-labeled" to="/products/brands" ><b><i className="icon-undo2"></i></b>Back</Link></p>
                
                    <form onSubmit={this.handleSubmit} className="form-horizontal" method="post" encType="multipart/form-data">
                        <div class="panel panel-flat">
                                
                            <div class="panel-body">

                 
                            {this.renderInput('name', 'Name', 'text', true)}
                            {this.renderInput('position', 'Position', 'text', true)}
                            {this.renderInput('office', 'Office', 'text', true)}
                            {this.renderNumber('age', 'Age', true, 'off', 'any', 18)}
                            {this.renderInput('date', 'Date', 'date', true)}
                            {this.renderNumber('salary', 'Salary', true, 'off', 'any', 0)}
                            {this.renderSubmit()}
                                
                            </div>
                        </div>

                    </form>
                </Main>
            </React.Fragment>
         );
    }
}
 
export default BrandAction;