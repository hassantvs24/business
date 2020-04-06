import React from 'react';
import { Title } from './title';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const Main = ({title, header, children}) => {

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiPaper: {
                elevation4: {
                  fontSize: 12,
                  boxShadow: 'none',
                }
              },

            MUIDataTable: {
                responsiveStacked: {
                    overflow: 'none',
                    overflowX: 'none'
                }
              },

            MuiChip: {
              root: {
                fontSize: 12,
              }
            },

          MUIDataTableBodyCell: {
            root: {
              fontSize: 12,
              padding: '1px 3px'
            }
          },

          MuiTooltip: {
            tooltip: {
              fontSize: 10
            }
          },

          MuiTableCell: {
            root: {
              padding: 0
            }
          },

          MUIDataTableHeadCell: {
            root: {
              fontSize: 12
            }
          },

          MuiSvgIcon: {
            root: {
              fontSize: 18
            }
          },

          MuiFormLabel: {
            root: {
              fontSize: 16
            }
          },

          MuiInputBase: {
            root: {
              fontSize: 12
            }
          },

          MuiMenuItem: {
            root: {
              fontSize: 12
            }
          },

          MuiTypography: {
            subtitle1: {
              fontSize: 12
            }
          },
          
          MuiTablePagination: {
           caption: {
              fontSize: 12
            },
            root: {
                fontSize: 12
              }
          }
        }
      });

    return ( 
        <React.Fragment>
            {title && <Title title={title}/>}
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-flat border-top-success">
                        {header && <div className="panel-heading"><h6 className="panel-title">{header}</h6></div>}
        
                        <div className="panel-body">
                            <MuiThemeProvider theme={getMuiTheme()}>
                                {children}
                            </MuiThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Main;