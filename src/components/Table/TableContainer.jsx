import { connect } from 'react-redux';
import Table from './Table';
import { setKeysTableAc, setSortedTableDataAc } from '../../redux/table_reducer';

let mapStateToProps = (state) => {
  return {
    table: state.table,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setKeysTable: (tableData) => {
      dispatch(setKeysTableAc(tableData));
    },
    setSortedTableData: (tableData, keysTableData) => {
      dispatch(setSortedTableDataAc(tableData, keysTableData));
    },
  };
};

const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableContainer;
