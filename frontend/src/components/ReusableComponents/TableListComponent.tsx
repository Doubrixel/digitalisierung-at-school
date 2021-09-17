/**
 * Übersichtsseite für die Facharbeit.
 */

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './TableListStyles.css';
import { Checkbox, TextareaAutosize } from '@material-ui/core';

const columnContentMock = ['cb1', 'cb2', 'cb3', 'aa123'];
const createColumnContentMock = columnContentMock.map((content) => ([
  <div style={{ fontSize: 'x-large' }}>{`${content}divcontent`}</div>,
  content,
  <Checkbox title={content} onClick={() => alert('Checkbox clicked')} />,
  <TextareaAutosize />,
]));

export const tablePropsMock = { columnHeaderMock: ['column 1', 'column 2', 'column 3', 'textarea column'], dataRowsMock: createColumnContentMock };

/*
The TableListComponent has three props:
  columnHeaders: Array of strings, with the column-Headers of a table
  dataRows: Array of Array of Objects: Two-dimensional Array. The first
    Array contains the table Rows, the second
    Array contains for each row the content of the table cells.
    the content can be any Object for example a String, Button or textfield
    IMPORTANT NOTE: The columnHeaders and the Second Array should have the
    same length, otherwise the column count
    in the header and in the rows is not the same
 tableStyleObject: Is Optional. Here a StyleObject can be passed,
  to customize the table (e.g. the width, backgroundColor etc.)
 firstColumnStyleObject: Is Optional. Here a StyleObject can be passed,
  to customize the first column
*/

function TableListComponent(
  {
    columnHeaders, dataRows, tableStyleObject, firstColumnStyleObject,
    // the styleObjects need no default prop.
    // if the componets get no styleObjects, defaultstyles apply anyway
    // eslint-disable-next-line react/require-default-props,max-len
  }: { columnHeaders: Array<String>, dataRows: Array<Array<Object>>, tableStyleObject?: Object, firstColumnStyleObject?: Object },
) {
  function createTableHeader() {
    return (
      <TableHead>
        <TableRow>
          {columnHeaders.map((header) => (
            <TableCell align="center" className="tableHeader">{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  function createTableBody() {
    return (
      <TableBody>
        {dataRows.map((dataRow) => (
          <TableRow>
            {
                  dataRow.map((tableCellContent, index) => {
                    if (index === 0 && firstColumnStyleObject) {
                      return (
                        <TableCell align="center" style={firstColumnStyleObject}>
                          {tableCellContent}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell align="center">
                        {tableCellContent}
                      </TableCell>
                    );
                  })
                }
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableContainer id="tableContainer" className="tableContainer">
      <Table aria-label="simple table" component={Paper} style={tableStyleObject}>
        {createTableHeader()}
        {createTableBody()}
      </Table>
    </TableContainer>
  );
}
export default TableListComponent;
