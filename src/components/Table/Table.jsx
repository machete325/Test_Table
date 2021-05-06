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
import s from './Table.module.css';
import Column from './Column/Column';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MovableItem from './MovableItem/MovableItem';

const Table = (props) => {
  const [open, setOpen] = useState(false);
  const SearchElement = React.createRef();

  useEffect(() => {
    props.setSortedTableData(props.table.tableData, props.table.keysTableData);
  }, [props.table.keysTableData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setSortedTableData = () => {
    props.setSortedTableData(props.table.tableData, props.table.keysTableData);
    setOpen(false);
  };

  // Returning items for the columns of the modal window
  const returnItemsForColumn = (columnName, search_word) => {
    const result = props.table.keysTableData.filter((e) =>
      e.column === 'Column 2' ? e : e.label.toLowerCase().startsWith(search_word.toLowerCase()),
    );
    return result
      .filter((item) => item.column === columnName)
      .map((item) => (
        <MovableItem
          name={item.key}
          label={item.label}
          updateKeysTable={props.updateKeysTable}
          keysTableData={props.table.keysTableData}
          column={item.column}
        />
      ));
  };

  // Return actual cells for the table
  const returnCell = (row) => {
    let arr = [];
    for (let key in row) {
      arr.push(<TableCell align="center">{row[key]}</TableCell>);
    }
    return arr;
  };

  const onSearch = () => {
    const searchWord = SearchElement.current.value;
    props.setNewText(searchWord, props.table.keysTableData);
  };

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
            <DialogTitle id="alert-dialog-title"> Select Grid Columns</DialogTitle>
            <DialogContent className={s.DialogContent}>
              <div className={s.inputContainer}>
                <input
                  className={s.input}
                  onChange={onSearch}
                  ref={SearchElement}
                  placeholder="Search..."
                  value={props.table.newText}
                />
              </div>
              <DndProvider backend={HTML5Backend}>
                <div className={s.ColumnItem}>
                  <Column text="List of Columns" title="Column 1">
                    {returnItemsForColumn('Column 1', props.table.newText)}
                  </Column>
                  <Column text="Checked Columns" title="Column 2">
                    {returnItemsForColumn('Column 2', props.table.newText)}
                  </Column>
                </div>
              </DndProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={setSortedTableData} variant="contained" color="primary" autoFocus>
                Apply
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
              {props.table.sortedTableData[0] !== undefined &&
                Object.keys(props.table.sortedTableData[0]).length === 0 && (
                  <div className={s.TableInfo}>Please select columns to display the table</div>
                )}
              {props.table.sortedTableData.map((row) => (
                <TableRow key={row.id}>{returnCell(row)}</TableRow>
              ))}
            </TableBody>
          </TableMaterial>
        </TableContainer>
      </div>
    </div>
  );
};

export default Table;
