import React from 'react';
import uuid4 from 'uuid4'

const GnSelect = ({label, options, error, rq, ...rest}) => {

    return ( 
        <React.Fragment>

            <div className={error ? "form-group has-error":  "form-group"}>
                <label className="control-label col-lg-3">{label} {rq && <span className="text-danger">*</span>}</label>
                <div className="col-lg-9">
                    <select {...rest} className="form-control" required={rq && 'required'} >    
                        {options.map(option => <option key={uuid4()} value={option.value}>{option.label}</option>)}
                    </select>
                    {error && <span className="help-block">{error}</span>}
                </div>
            </div>
            
        </React.Fragment>
     );
}
 
export default GnSelect;