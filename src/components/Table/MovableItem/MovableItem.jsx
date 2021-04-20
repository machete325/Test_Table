import s from './MovableItem.module.css';
import { useDrag } from 'react-dnd';

const MovableItem = ({ setIsFirstColumn }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TableKey',
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.name === 'Column 1') {
        setIsFirstColumn(true);
      } else {
        setIsFirstColumn(false);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} className={s.item} style={{ opacity }}>
      id
    </div>
  );
};

export default MovableItem;
