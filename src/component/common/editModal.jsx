import React from 'react';

const EditModal = ({title, size, children, link, idValue, validate}) => {
    return ( 

        <div id="ediModal" className="modal fade">
            <div className={`modal-dialog ${size}`}>
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title"><i className="icon-pencil5"></i> {title}</h5>
                        </div>
                            <form onSubmit={link} className="form-horizontal" method="post" encType="multipart/form-data">
                            <div className="modal-body">
                                {children}
                            </div>

                            <div className="modal-footer mt-15">
                                <button type="button" id="ediClose" className="btn btn-danger" data-dismiss="modal"><i className="icon-cancel-circle2"></i> Close</button>
                                <button type="submit" disabled={validate} className="btn btn-info"><i className="icon-checkmark4"></i> Submit</button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>

     );
}
 
export default EditModal;