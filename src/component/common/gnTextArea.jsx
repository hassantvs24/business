import React from 'react';

const GnTextArea = ({label, error, rq, ...rest}) => {
    return ( 
        <React.Fragment>

            <div className={error ? "form-group has-error":  "form-group"}>
                <label className="control-label col-lg-3">{label} {rq && <span className="text-danger">*</span>}</label>
                <div className="col-lg-9">
                    <textarea {...rest} placeholder={label} className="form-control" required={rq && 'required'} ></textarea>
                    {error && <span className="help-block">{error}</span>}
                </div>
            </div>
            
        </React.Fragment>
     );
}
 
export default GnTextArea;