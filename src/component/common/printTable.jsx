import React, { Component } from 'react';
import uuid4 from 'uuid4';

class PrintTable extends Component {
   getHeadData = () => {
    const {tableData} = this.props;
    const tableHeader = tableData[0];
    
    return tableHeader;
   };

   getBodyData = () => {
        const {tableData} = this.props;
        const tableBody = tableData;

        return tableBody;
   };

    render() { 
        const tableHeader = this.getHeadData();
        const tableBody = this.getBodyData();
        return ( 
            <div className="container pt-10">
                <div className="row">
                    <div className="col-xs-12">
                        <table className="table table-striped table-bordered table-condensed" style={{ width: "100%" }} id="test-table-xls-button">
                                <caption><b>{this.props.reportName}</b></caption>
                                <thead>
                                    <tr>
                                        {tableHeader.map(head => <th key={uuid4()} className="p-5 pt-0 pb-0">{head}</th>)}
                                    </tr>

                                </thead>
                                <tbody>
                                    {tableBody.slice(1).map((row, i) => 
                                        <tr key={uuid4()}>
                                            {row.map(col => <td key={uuid4()} className="p-5 pt-0 pb-0">{col}</td>)}
                                        </tr>)}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default PrintTable;