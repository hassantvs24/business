import React from 'react';
import Select from 'react-select';

const GnSelectTwo = ({label, options, error, rq, ...rest}) => {

    return ( 
        <React.Fragment>

            <div className={error ? "form-group has-error":  "form-group"}>
                <label className="control-label col-lg-3">{label} {rq && <span className="text-danger">*</span>}</label>
                <div className="col-lg-9">
                    <Select  {...rest}  options={options} required={rq && 'required'}/>
                    {error && <span className="help-block">{error}</span>}
                </div>
            </div>
            
        </React.Fragment>
     );
}
 
export default GnSelectTwo;