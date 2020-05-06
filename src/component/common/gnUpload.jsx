import React from 'react';

const GnUpload = ({label, error, rq, ...rest}) => {
    return ( 
        <React.Fragment>

            <div className={error ? "form-group has-error":  "form-group"}>
                <label className="control-label col-lg-3">{label} {rq && <span className="text-danger">*</span>}</label>
                <div className="col-lg-9">
                    <input type="file" {...rest} className="form-control" required={rq && 'required'} />
                    {error && <span className="help-block">{error}</span>}
                </div>
            </div>
            
        </React.Fragment>
        
    );
}
 
export default GnUpload;