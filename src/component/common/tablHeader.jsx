import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import CsvLink from 'react-csv-export';
import PrintTable from './printTable';


class TableHeader extends Component {
    state = {  }

    csvData = () => {
        const {tableHeaderData, tableData} = this.props;

        const getLabel = tableHeaderData.map(header => {
            return header.label;
        });

        const getValue = tableHeaderData.map(header => {
            return header.value;
        });

        const createTable = tableData.map(data => {
            return getValue.map(val => data[val]);
        });

         createTable.splice(0,0,getLabel);

        return {createTable};
    }

    render() { 
        const {value, onChange, filterColumns, selectColumn, bulkDelete, isExport, reportName} = this.props;
        const {createTable} = this.csvData();
        const csvFileName = reportName.replace(/\s+/g, '_').toLowerCase();
        return ( 
            <React.Fragment>
      
            <div className="btn-group" style={{ zIndex: '1000' }}>
                
                    {isExport ? (
                        <React.Fragment>
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Action <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <ReactToPrint
                                        trigger={() => <span className="pl-15 cus"><i className="icon-printer"></i> Print</span>}
                                        content={() => this.componentRef}
                                    />
                                </li>
                                <li>
                                <CsvLink data={createTable} fileName={`${csvFileName}.csv`}>
                                    <span className="cus"><i className="icon-file-spreadsheet"></i> Export AS CSV</span>
                                </CsvLink>
                                    </li>
                                
                                <li><a onClick={bulkDelete} href="#/"><i className="icon-bin"></i> Delete</a></li>
                            </ul>
                        </React.Fragment>

                        ) : (
                            <React.Fragment>
                                <button onClick={bulkDelete} type="button" className="btn btn-default" >Delete</button>
                            </React.Fragment>
                        )}
                
            </div>

            
            <div className="input-group">
                <span className="input-group-addon" title="Search Item"><i className="icon-search4"></i></span>
                
                <input type="text" className="form-control" placeholder="Search..." value={value} onChange={e => onChange(e.currentTarget.value)} />
                
            </div>
            <div className="input-group">
                <select className="form-control" onChange={e => selectColumn(e.currentTarget.value)} title="Column Search Filter" >
                    {filterColumns.map((filterColumn, i) => {
                        return <option value={filterColumn.value} key={i} >{filterColumn.label}</option>
                    })}
                </select>
            </div>


            <div style={{ display: 'none' }}>
                <PrintTable  reportName={reportName} tableData={createTable} ref={el => (this.componentRef = el)} />
            </div>
            

        </React.Fragment>
         );
    }
}

export default TableHeader;