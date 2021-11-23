/* eslint-disable */
/* es-lint: fixed everything I could manually, more makes it chaotic e.g. no line break but too long for one line etc. */
import * as React from 'react';
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
import { visuallyHidden } from '@mui/utils';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';

interface Data {
  partner: string;
  referenzfach: string;
  pruefer: string;
  bezugsfach: string;
  name: string;
  PPOrBLL: string;
  topic: string;
  genehmigt: string;
}

function createData(
  name: string,
  partner: string,
  PPOrBLL: string,
  referenzfach: string,
  bezugsfach: string,
  pruefer: string,
  topic: string,
  genehmigt:string,
): Data {
  return {
    name,
    partner,
    PPOrBLL,
    referenzfach,
    bezugsfach,
    pruefer,
    topic,
    genehmigt,
  };
}

const rows = [
  createData('Alex Schmidt', 'Cupcake', 'BLL', 'Deutsch', 'Englisch', 'Mr. Jonson', 'Delfine','Nein'),
  createData('Hans Fischer', 'Donut', 'BLL', 'Mathe', 'Mathe', 'Mrs. Heathrow', 'Wasser', 'Ja'),
  createData('Peter Becker', 'Eclair', 'PP', 'Physik', 'Physik', 'Miss Daisy', 'Feuer', 'Ja'),
  createData('Maria Koch', 'Frozen yoghurt', 'BLL', '6.0', '24', '4.0', 'a', 'Ja'),
  createData('Monika Meyer', 'Partner1', 'PP', '16.0', '49', '3.9', 'b', 'Nein'),
  createData('Ursula Schneider', 'Honeycomb', '408', '3.2', '87', '6.5', 'c', 'Nein'),
  createData('Brigitte Schmitz', 'Ice cream sandwich', '237', '9.0', '37', '4.3', 'd', 'Nein'),
  createData('Renate Müller', 'Jelly Bean', '375', '0.0', '94', '0.0', 'a', 'Ja'),
  createData('Heinz Hoffmann', 'KitKat', '518', '26.0', '65', '7.0', 'Wasser', 'Nein'),
  createData('Gisela Peters', 'Lollipop', '392', '0.2', '98', '0.0', 'Geist', 'Nein'),
  createData('Karl Klein', 'Marshmallow', '318', '0', '81', '2.0', 'h', 'Nein'),
  createData('Hildegard Jansen', 'Nougat', '360', '19.0', '9', '37.0', 'k', 'Nein'),
  createData('Renate Köhler', 'Oreo', '437', '18.0', '63', '4.0', 'g', 'Nein'),
];

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
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Schüler:in',
  },
  {
    id: 'partner',
    numeric: false,
    disablePadding: true,
    label: 'Partner:in',
  },
  {
    id: 'PPOrBLL',
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
    id: 'pruefer',
    numeric: true,
    disablePadding: false,
    label: 'Prüfer:in',
  },
  {
    id: 'topic',
    numeric: true,
    disablePadding: false,
    label: 'Themenbereich',
  },
  {
    id: 'genehmigt',
    numeric: true,
    disablePadding: false,
    label: 'Genehmigt',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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
              {orderBy === headCell.id ? (
                <Box component="span" /* sx={visuallyHidden} */>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

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
        <Tooltip title="inspizieren/ändern">
          <IconButton>
            <CreateIcon sx={{ color: 'orange' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="select only one">
          <IconButton>
            <CreateIcon color="disabled" />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Genehmigen">
          <IconButton>
            <CheckIcon color="success" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="select Data">
          <IconButton>
            <CheckIcon color="disabled" />
          </IconButton>
        </Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Ablehnen">
          <IconButton>
            <ClearIcon sx={{ color: 'red' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="select Data">
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

export default function FifthExamAdminTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('partner');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
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
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.partner}</TableCell>
                      <TableCell align="right">{row.referenzfach}</TableCell>
                      <TableCell align="right">{row.bezugsfach}</TableCell>
                      <TableCell align="right">{row.pruefer}</TableCell>
                      <TableCell align="right">{row.PPOrBLL}</TableCell>
                      <TableCell align="right">{row.topic}</TableCell>
                      <TableCell align="right">{row.genehmigt}</TableCell>
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
    </Box>
  );
}
