import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';


class AuthRoute extends Component {
    state = { 
        user: {}
     }

    async componentDidMount(){
        const user = await auth.getCurrentUser();
        //if(!user) window.location = "/auth/login";
        this.setState({user});
    }

    render() { 
        const {component: Component, render, ...rest} = this.props;
        const {user} = this.state;
        return ( 
            <Route  {...rest} render={ props => {
                if(!user) return <Redirect to={{ 
                    pathname: "/auth/login",
                    state: {from: props.location} //Redirect current url or homepage
                 }} />;
                return Component ? <Component {...props}  user={user} /> : render(props);
              }} />
         );
    }
}
 
export default AuthRoute;