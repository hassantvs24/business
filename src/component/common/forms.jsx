import React, { Component } from 'react';
import Joi from 'joi-browser';
import GnInput from './gnInput';

class Forms extends Component {
    state = { 
        data: {},
        errors: {}
     }

     validate = () => {
        const options =  {abortEarly: false};//for Show all error
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if(!error) return null;
        const errors = {};

        for(let item of error.details) errors[item.path[0]] = item.message;
        
        return errors;

    }

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});

    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();

        this.setState({errors: errors || {} });

        if(errors) return;

        this.doSubmit();
    }


    renderSubmit(){
        return (<div className="text-right">
                    <button type="Submit" className="btn btn-primary" disabled={this.validate()}>Submit Now <i className="icon-arrow-right14 position-right"></i></button>
                </div>);
    }

    renderInput(name, label, type = 'text', rq= false, autocomplete='on'){
        const {data, errors} = this.state;
        return (<GnInput label={label} name={name} onChange={this.handleChange} value={data[name]} error={errors[name]} type={type} rq={rq} autoComplete={autocomplete} />);
    }

    renderNumber(name, label, rq= false, autocomplete='on', step='any',  min, max){
        const {data, errors} = this.state;
        return (<GnInput label={label} name={name} onChange={this.handleChange} value={data[name]} 
            error={errors[name]} type="number" 
            rq={rq} 
            autoComplete={autocomplete} 
            min={min} 
            max={max} 
            step={step} 
        
        />);
    }

}
 
export default Forms;