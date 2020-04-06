import React from 'react';
import Select from 'react-select';

const GnSelect = ({label, error, rq, options, ...rest}) => {

    return ( 
        <React.Fragment>

            <div className={error ? "form-group has-error":  "form-group"}>
                <label className="control-label col-lg-3">{label} {rq && <span className="text-danger">*</span>}</label>
                <div className="col-lg-9">
                    <Select {...rest} required={rq && 'required'}  required={rq && 'required'} options={options} />
                    {error && <span className="help-block">{error}</span>}
                </div>
            </div>
            
        </React.Fragment>
     );
}
 
export default GnSelect;