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

function TableListComponent() {
  function createData(studentName, topic, firstTeacher, secondTeacher) {
    return {
      studentName, topic, firstTeacher, secondTeacher,
    };
  }

  const rows = [
    createData('Phillip J. Fry', 'im walking on sunshine', 'Mister X.', 'Mister Y.'),
    createData('Phillip J. Fry', 'im walking on sunshine', 'Mister X.', 'Mister Y.'),
    createData('Phillip J. Fry', 'im walking on sunshine', 'Mister X.', 'Mister Y.'),
    createData('Phillip J. Fry', 'im walking on sunshine', 'Mister X.', 'Mister Y.'),
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
    }}
    >
      <div style={{
        display: 'flex', width: '90%', justifyContent: 'space-between',
      }}
      />
      <TableContainer id="tableContainer" component={Paper} className="tableContainer">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="tableHeader">Schüler:in</TableCell>
              <TableCell align="center" className="tableHeader">Thema</TableCell>
              <TableCell align="center" className="tableHeader">1. Lehrkraft</TableCell>
              <TableCell align="center" className="tableHeader">2. Lehrkraft</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.studentName}>
                <TableCell align="center" className="tableLeftCell">{row.studentName}</TableCell>
                <TableCell align="center">{row.topic}</TableCell>
                <TableCell align="center">{row.firstTeacher}</TableCell>
                <TableCell align="center">{row.secondTeacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default TableListComponent;
