import React, { Component } from 'react';
import Main from './common/main';

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Main title="Dashboard" header="Dashboard">
                    <h1>Dashboard</h1>
                </Main>
            </React.Fragment>
        );
    }
}
 
export default Dashboard;