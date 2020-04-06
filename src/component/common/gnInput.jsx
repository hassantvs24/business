import React from 'react';

const GnInput = ({label, error, rq, ...rest}) => {
    return ( 
        <React.Fragment>

            <div className={error ? "form-group has-error":  "form-group"}>
                <label className="control-label col-lg-3">{label} {rq && <span className="text-danger">*</span>}</label>
                <div className="col-lg-9">
                    <input {...rest} placeholder={label} className="form-control" required={rq && 'required'} />
                    {error && <span className="help-block">{error}</span>}
                </div>
            </div>
            
        </React.Fragment>
        
    );
}
 
export default GnInput;