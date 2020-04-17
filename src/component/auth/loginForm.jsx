import React from 'react';
import {toast} from 'react-toastify';
import Joi from 'joi-browser';
import Forms from '../common/forms';
import auth from '../../services/authService';
import { Link } from 'react-router-dom';

class LoginForm extends Forms {
    state = { 
        data: {
            email:'', 
            password: ''
        },
        errors: {}
     }

     async componentDidMount(){
        const user = await auth.getCurrentUser();
        if(user) window.location = '/'; 
     }

     schema = {
        email: Joi.string().email().required().min(3).max(191).label('Email'),
        password: Joi.string().required().min(8).max(160).label('Password')
    }

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await auth.login(data.email, data.password);
            const {state} = this.props.location;
            window.location = (state ? state.from.pathname : '/'); 
          } catch (error) {
            toast.error(`Something Error: ${error}`);
          }
    }

    render() { 
        const {data, errors} = this.state;
        return ( 
            <div className="row">
                <div className="col-md-3 col-sm-4  col-xs-10 col-xs-offset-1  col-sm-offset-4 col-md-offset-4">
                    <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data"> 
                        <div className="panel panel-body login-form">
                            <div className="text-center">
                                <div className="icon-object border-slate-300 text-slate-300"><i className="icon-reading"></i></div>
                                <h5 className="content-group">Login to your account <small className="display-block">Enter your credentials below</small></h5>
                            </div>

                            <div className="form-group has-feedback has-feedback-left">
                                <input type="email" name="email" className="form-control" placeholder="Email" value={data['email']} onChange={this.handleChange} error={errors['email']} />
                                <div className="form-control-feedback">
                                    <i className="icon-envelop2 text-muted"></i>
                                </div>
                                {errors['email'] && <small className="form-text text-danger">{errors['email']}</small>}
                            </div>

                            <div className="form-group has-feedback has-feedback-left">
                                <input type="password" name="password" className="form-control" placeholder="Password" value={data['password']} onChange={this.handleChange} error={errors['password']} />
                                <div className="form-control-feedback">
                                    <i className="icon-lock text-muted"></i>
                                </div>
                                {errors['password'] && <small className="form-text text-danger">{errors['password']}</small>}
                            </div>

                            <div className="form-group">
                                <button type="submit" disabled={this.validate()} className="btn btn-primary btn-block">Sign in <i className="icon-circle-right2 position-right"></i></button>
                            </div>

                             <div className="text-center">
                                <Link to="/auth/register">Do you have no account?</Link>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
            
         );
    }
}
 
export default LoginForm;