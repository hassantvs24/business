import React from 'react';

const AuthHeader = () => {
    return ( 
        <div className="navbar navbar-inverse  navbar-fixed-top">
            <div className="navbar-header">
                <a className="navbar-brand" href="#/"><img src="../../assets/images/logo_light.png" alt="bLogo" /></a>

                <ul className="nav navbar-nav pull-right visible-xs-block">
                    <li><a href="#/" data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
                </ul>
            </div>

            <div className="navbar-collapse collapse" id="navbar-mobile">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="#/">
                            <i className="icon-display4"></i> <span className="visible-xs-inline-block position-right"> Go to website</span>
                        </a>
                    </li>

                    <li>
                        <a href="#/">
                            <i className="icon-user-tie"></i> <span className="visible-xs-inline-block position-right"> Contact admin</span>
                        </a>
                    </li>

                    <li className="dropdown">
                        <a href="#/" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="icon-cog3"></i>
                            <span className="visible-xs-inline-block position-right"> Options</span>
                        </a>
                    </li>
                </ul>
            </div>
	    </div>
     );
}
 
export default AuthHeader;