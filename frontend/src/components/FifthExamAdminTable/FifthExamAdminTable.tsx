/* eslint-disable */
/* es-lint: fixed everything I could manually, more makes it chaotic e.g. no line break but too long for one line etc. */
import * as React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';

import Button from '@material-ui/core/Button';
import DescriptionIcon from '@mui/icons-material/Description';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../reducer";
import { ExamInterface } from "../../reducer/FifthExamReducer";
import { useEffect } from 'react';
import { setPreFilledDataIn5PKFormEditedByAdmin } from '../../actions/FifthExamActions'
import sendApiRequest from "../../APIRequestFunction"
import TextField from '@mui/material/TextField';

let handleOnClickApprove;
let handleEditRowClick;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ExamInterface;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'studentName',
    numeric: false,
    disablePadding: true,
    label: 'Schüler:in',
  },
  {
    id: 'partnerStudentName',
    numeric: false,
    disablePadding: true,
    label: 'Partner:in',
  },
  {
    id: 'examType',
    numeric: true,
    disablePadding: false,
    label: 'Art',
  },
  {
    id: 'referenzfach',
    numeric: true,
    disablePadding: false,
    label: 'Referenzfach',
  },
  {
    id: 'bezugsfach',
    numeric: true,
    disablePadding: false,
    label: 'Bezugsfach',
  },
  {
    id: 'examiner',
    numeric: true,
    disablePadding: false,
    label: 'Prüfer:in',
  },
  {
    id: 'topicArea',
    numeric: true,
    disablePadding: false,
    label: 'Themenbereich',
  },
  {
    id: 'approved',
    numeric: true,
    disablePadding: false,
    label: 'Genehmigt',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ExamInterface) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof ExamInterface) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selectedRows: any;
  setPreFilledDataIn5PKFormEditedByAdmin: any;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, selectedRows} = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
          selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Anträge
        </Typography>
      )}
      {numSelected == 1 ? (
        <Tooltip title="Eintrag bearbeiten">
          <IconButton>
            <CreateIcon onClick={() => handleEditRowClick(selectedRows)} sx={{ color: 'orange' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Zum Bearbeiten muss genau ein Eintrag ausgewählt sein">
          <IconButton>
            <CreateIcon color="disabled" />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Ausgewählte Einträge genehmigen">
          <IconButton onClick={(event: React.MouseEvent<unknown>) =>handleOnClickApprove(event, true)}>
            <CheckIcon color="success" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Zum Genehmigen müssen Einträge ausgewählt werden">
          <IconButton>
            <CheckIcon color="disabled" />
          </IconButton>
        </Tooltip>
      )}
      {numSelected == 1 ? (
        <Tooltip title="Eintrag ablehnen">
          <IconButton>
            <ClearIcon onClick={(event: React.MouseEvent<unknown>) =>handleOnClickApprove(event, false)} sx={{ color: 'red' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Zum Ablehnen muss genau ein Eintrag ausgewählt sein">
          <IconButton>
            <ClearIcon color="disabled" />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="select Data">
          <IconButton>
            <DeleteIcon color="disabled" />
          </IconButton>
        </Tooltip>
      )}

    </Toolbar>
  );
};

function FifthExamAdminTable(props) {
  const dispatch = useDispatch();

  const [showTopicDialog, setShowTopicDialog] = React.useState(false);
  const [currentAnnotation, setCurrentAnnotation] = React.useState('');
  const [showDeclineReasonDialog, setShowDeclineReasonDialog] = React.useState(false);
  const [currentDeclineReason, setCurrentDeclineReason] = React.useState('');
  const [currentSelectedExamId, setCurrentSelectedExamId] = React.useState('');

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ExamInterface>('studentName');
  const [selected, setSelected] = React.useState<readonly any[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows: ExamInterface[] = useSelector((state: RootState) => state.fithExamAdminReducer.allExams )

  const showFullTopic = (annotation) => {
    setShowTopicDialog(true);
    setCurrentAnnotation(annotation);
  };
  const hideFullTopic = () => {
    setShowTopicDialog(false);
  };
  const hideDeclineReasonAndSendApiRequest = () => {
    setShowDeclineReasonDialog(false);

    let body = {examId: currentSelectedExamId, approved: false, reason: currentDeclineReason}
    sendApiRequest('/api/abitur/setApprovalState', 'POST', body)
      .then((response) => {
        if (response.status != 200) {
          console.log('Fehler beim Ablehnen: Http-Statuscode: ' + response.status)
        }
      });
    //no need for page reloading
    rows.map((row) => {
      if(String(row.examId) == currentSelectedExamId){
        row.approved=false;
      }
    });
  };
  const handleCurrentDeclineReasonOnChange= (event) => {
    setCurrentDeclineReason(event.target.value);
  };

  const history = useHistory();
  handleEditRowClick = (selectedRows) => {
    const selectedRowData = rows.find((row) => {
      // @ts-ignore
      if(row.examId === selectedRows[0]){
        return true;
      }
    })
    setPreFilledDataIn5PKFormEditedByAdmin(selectedRowData)
    history.push('/admin/pruefungskomponente/editStudentApplication')
  }

  handleOnClickApprove= (event: React.MouseEvent<unknown>, isApproved: boolean) => {
    if(isApproved){
      //approve
      let body, examId;

      for (let i = 0; i < selected.length; i++) {
        examId = selected[i];
        body = {examId: examId, approved: isApproved}
        sendApiRequest('/api/abitur/setApprovalState', 'POST', body)
          .then((response) => {
            if (response.status != 200) {
              console.log('Fehler beim Genehmigen: Http-Statuscode: ' + response.status)
            }
          });
        //no need for page reloading
        rows.map((row) => {
          if(String(row.examId) == examId){
            row.approved=true;
          }
        });
      }
    }else{
      //decline
      setCurrentSelectedExamId(selected[0]);
      setShowDeclineReasonDialog(true);
    }
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ExamInterface,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // @ts-ignore
      const newSelecteds = rows.map((row) => {
        // @ts-ignore
        return row.examId;
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, rowId: any) => {
    const selectedIndex = selected.indexOf(rowId);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rowsWithIds.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const isPropertyUpdated = (updatedProperty: any) =>{
    return updatedProperty !== ('' || null);
  }

  useEffect(() => {
    sendApiRequest('/api/abitur/getAllExams', 'GET')
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: 'LOAD_ALL_EXAMS', payload: json });
      });
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selectedRows={selected} setPreFilledDataIn5PKFormEditedByAdmin={props.setPreFilledDataIn5PKFormEditedByAdmin} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rowsWithIds.slice().sort(getComparator(order, orderBy)) */}
              {/* @ts-ignore */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // @ts-ignore
                  const isItemSelected = isSelected(row.examId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      // @ts-ignore
                      key={row.examId}
                      // @ts-ignore
                      onClick={(event) => handleClick(event, row.examId)}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.studentName}
                      </TableCell>
                      <TableCell align="right">{!isPropertyUpdated(row.updatedPartnerStudentName) ? row.partnerStudentName: row.updatedPartnerStudentName}</TableCell>
                      <TableCell align="right">{row.examType}</TableCell>
                      <TableCell align="right">{!isPropertyUpdated(row.updatedReferenzfach) ? row.referenzfach: row.updatedReferenzfach}</TableCell>
                      <TableCell align="right">{!isPropertyUpdated(row.updatedBezugsfach) ? row.bezugsfach: row.updatedBezugsfach}</TableCell>
                      <TableCell align="right">{!isPropertyUpdated(row.updatedExaminer) ? row.examiner: row.updatedExaminer}</TableCell>
                      <TableCell align="right">
                        <Button title="Thema ansehen" onClick={() => showFullTopic(!isPropertyUpdated(row.updatedTopicArea)? row.topicArea: row.updatedTopicArea)}>
                          <DescriptionIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="right">{row.approved ? "Ja" : "Nein"}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      <Dialog
        open={showTopicDialog}
        onClose={hideFullTopic}
      >
        <DialogTitle id="submit_evaluations_dialog_title">{'Thema: '}</DialogTitle>
        <DialogContent>
          <DialogContentText id="submit_evaluations__dialog_content">
            {currentAnnotation}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideFullTopic} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showDeclineReasonDialog}
        onClose={hideDeclineReasonAndSendApiRequest}
      >
        <DialogTitle id="submit_evaluations_dialog_title" >{'Ablehnungsgrund: '}</DialogTitle>
        <DialogContent
          >
          <TextField
            label="Ablehnungsgrund"
            variant="outlined"
            onChange={handleCurrentDeclineReasonOnChange}
            value={currentDeclineReason}
            rows={5}
            multiline
            style={{ width: '50vh' }}>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDeclineReasonAndSendApiRequest} color="primary">
            Bestätigen
          </Button>
        </DialogActions>
    </Dialog>
    </Box>
  );
}

export default connect(null, {setPreFilledDataIn5PKFormEditedByAdmin})(FifthExamAdminTable)
