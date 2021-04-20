import React, { useState, useEffect } from 'react';
import TableMaterial from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import s from './Table.module.css';
import Column from './Column/Column';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MovableItem from './MovableItem/MovableItem';

const Table = (props) => {
  const [open, setOpen] = useState(false);
  const [isFirstColumn, setIsFirstColumn] = useState(true);

  const Item = <MovableItem setIsFirstColumn={setIsFirstColumn} />;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.setKeysTable(props.table.tableData);
    props.setSortedTableData(props.table.tableData, props.table.keysTableData);
  }, [props.table.keysTableData]);

  debugger;

  const returnItemsForColumn = (columnName) => {};

  return (
    <div className={s.Container}>
      <div className={s.titleContainer}>
        <div className={s.title}>Users</div>
        <div className={s.button}>
          <Button variant="contained" color="secondary" onClick={handleClickOpen}>
            Select Grid Columns
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Title</DialogTitle>
            <DialogContent className={s.DialogContent}>
              <TextField id="outlined-search" label="Search..." type="search" variant="outlined" />
              <DndProvider backend={HTML5Backend}>
                <div className={s.ColumnItem}>
                  <Column title="Column 1">{isFirstColumn && Item}</Column>
                  <Column title="Column 2">{!isFirstColumn && Item}</Column>
                </div>
              </DndProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className={s.TableContainer}>
        <TableContainer component={Paper}>
          <TableMaterial>
            <TableHead>
              <TableRow>
                {props.table.keysTableData.map((item) => {
                  if (item.column !== 'Column 1') {
                    return <TableCell align="center">{item.key}</TableCell>;
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.table.sortedTableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.FirstName}</TableCell>
                  <TableCell align="center">{row.LastName}</TableCell>
                  <TableCell align="center">{row.Email}</TableCell>
                  <TableCell align="center">{row.Role}</TableCell>
                  <TableCell align="center">{row.BDay}</TableCell>
                  <TableCell align="center">{row.Phone}</TableCell>
                  <TableCell align="center">{row.Country}</TableCell>
                  <TableCell align="center">{row.Password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableMaterial>
        </TableContainer>
      </div>
    </div>
  );
};

export default Table;
