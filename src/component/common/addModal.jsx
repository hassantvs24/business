import React from 'react';

const AddModal = ({title, size,  children, link, validate}) => {
    return ( 
        <div id="myModal" className="modal fade">
            <div className={`modal-dialog ${size}`}>
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h5 className="modal-title"><i className="icon-file-plus"></i> {title}</h5>
                    </div>

                    <form onSubmit={link} className="form-horizontal" method="post" encType="multipart/form-data">

                        <div className="modal-body">
                       
                                {children}
                          
                        </div>

                        <div className="modal-footer">
                            <button type="button" id="addClose" className="btn btn-danger" data-dismiss="modal"><i className="icon-cancel-circle2"></i> Close</button>
                            <button type="submit" disabled={validate} className="btn btn-primary"><i className="icon-checkmark4"></i> Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default AddModal;