import s from './MovableItem.module.css';
import { useDrag } from 'react-dnd';
import CancelIcon from '@material-ui/icons/Cancel';

const MovableItem = ({ name, updateKeysTable, keysTableData, column }) => {
  const changeItemColumn = (currentItem, columnName) => {
    const keysTable = keysTableData.map((e) => {
      return {
        ...e,
        column: e.key === currentItem.name ? columnName : e.column,
      };
    });
    return updateKeysTable(keysTable);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'TableKey',
    item: { name, type: 'TableKey' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.name === 'Column 1') {
        changeItemColumn(item, 'Column 1');
      } else {
        changeItemColumn(item, 'Column 2');
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onDeleteItem = () => {
    let item = { name, type: 'TableKey' };
    changeItemColumn(item, 'Column 1');
  };

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} className={s.item} style={{ opacity }}>
      <div className={s.itemName}>{name}</div>
      {column !== 'Column 1' && (
        <div className={s.button}>
          <CancelIcon className={s.ButtonIcon} onClick={onDeleteItem}></CancelIcon>
        </div>
      )}
    </div>
  );
};

export default MovableItem;
