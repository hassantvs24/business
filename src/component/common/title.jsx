import React from 'react';
import Helmet from 'react-helmet';

const Title = ({ title }) => {
    return ( 
        <Helmet>
            <title>{ title ? title : `${process.env.REACT_APP_NAME}`}</title>
        </Helmet>
     );
}
 
export {Title};