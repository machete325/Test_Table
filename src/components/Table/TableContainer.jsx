import { connect } from 'react-redux';
import Table from './Table';
import {
  setSortedTableDataAc,
  updateKeysTableAc,
  setNewTextAc,
  setKeysTableAc,
} from '../../redux/table_reducer';

let mapStateToProps = (state) => {
  return {
    table: state.table,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setSortedTableData: (tableData, keysTableData) => {
      dispatch(setSortedTableDataAc(tableData, keysTableData));
    },
    updateKeysTable: (keysTableData) => {
      dispatch(updateKeysTableAc(keysTableData));
    },
    setNewText: (newText, keysTableData) => {
      dispatch(setNewTextAc(newText, keysTableData));
    },
  };
};

const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableContainer;
