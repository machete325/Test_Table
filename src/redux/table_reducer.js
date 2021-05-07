const SET_SORTED_TABLE_DATA = 'SET_SORTED_TABLE_DATA';
const UPDATE_KEYS_TABLE = 'UPDATE_KEYS_TABLE';
const SET_NEW_TEXT = 'SET_NEW_TEXT';

let initialState = {
  tableData: [
    {
      id: 1,
      FirstName: 'Pierce',
      LastName: 'Perkins',
      Email: 'pierce@gmail.com',
      Role: 'admin',
      BDay: '12.10.1995',
      Phone: '0951244857',
      Country: 'Ukraine',
      Password: 'admin',
    },
    {
      id: 2,
      FirstName: 'Bertram',
      LastName: 'Stafford',
      Email: 'bertram@gmail.com',
      Role: 'user',
      BDay: '12.10.1995',
      Phone: '0651344857',
      Country: 'Ukraine',
      Password: 'Stafford',
    },
    {
      id: 3,
      FirstName: 'Carol',
      LastName: 'Thornton',
      Email: 'carol@gmail.com',
      Role: 'user',
      BDay: '12.10.1995',
      Phone: '0961241837',
      Country: 'Ukraine',
      Password: 'Thornton',
    },
    {
      id: 4,
      FirstName: 'Sheila',
      LastName: 'Carter',
      Email: 'sheila@gmail.com',
      Role: 'user',
      BDay: '12.10.1995',
      Phone: '0963247857',
      Country: 'Ukraine',
      Password: 'Carter',
    },
    {
      id: 5,
      FirstName: 'Brenda',
      LastName: 'Warren',
      Email: 'brenda@gmail.com',
      Role: 'admin',
      BDay: '12.10.1995',
      Phone: '0931214551',
      Country: 'Ukraine',
      Password: 'admin',
    },
  ],
  keysTableData: [
    { key: 'id', label: 'ID', column: 'Column 2' },
    { key: 'FirstName', label: 'First Name', column: 'Column 2' },
    { key: 'LastName', label: 'Last Name', column: 'Column 2' },
    { key: 'Email', label: 'Email', column: 'Column 2' },
    { key: 'Role', label: 'Role', column: 'Column 1' },
    { key: 'BDay', label: 'Birthday', column: 'Column 1' },
    { key: 'Phone', label: 'Phone', column: 'Column 1' },
    { key: 'Country', label: 'Country', column: 'Column 1' },
    { key: 'Password', label: 'Password', column: 'Column 1' },
  ],
  sortedTableData: [],
  newText: '',
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    // Remove non-displayable keys from the object
    case SET_SORTED_TABLE_DATA: {
      let keys = [...action.keysTableData];
      keys = keys.filter((e) => e.column === 'Column 1');
      const sortKeys = keys.map((item) => {
        return item.key;
      });

      let newTableData = JSON.parse(JSON.stringify(action.tableData));
      newTableData.forEach((elem) => {
        for (let key of Object.keys(elem)) {
          sortKeys.includes(key) && delete elem[key];
        }
      });

      const stateCopy = {
        ...state,
        sortedTableData: [...newTableData],
      };
      return stateCopy;
    }
    // Update key information
    case UPDATE_KEYS_TABLE: {
      const stateCopy = {
        ...state,
        keysTableData: [...action.keysTableData],
      };
      return stateCopy;
    }

    // Writing text to the state
    case SET_NEW_TEXT: {
      const stateCopy = {
        ...state,
        newText: action.newText,
      };
      return stateCopy;
    }
    default:
      return state;
  }
};

export const setSortedTableDataAc = (tableData, keysTableData) => {
  return {
    type: SET_SORTED_TABLE_DATA,
    tableData,
    keysTableData,
  };
};

export const updateKeysTableAc = (keysTableData) => {
  return {
    type: UPDATE_KEYS_TABLE,
    keysTableData,
  };
};

export const setNewTextAc = (newText, keysTableData) => {
  return {
    type: SET_NEW_TEXT,
    newText,
    keysTableData,
  };
};

export default tableReducer;
