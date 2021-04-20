import s from './Column.module.css';
import { useDrop } from 'react-dnd';

const Column = (props) => {
  const [, drop] = useDrop({
    accept: 'TableKey',
    drop: () => ({ name: props.title }),
  });

  return (
    <div ref={drop} className={s.column}>
      {props.title}
      {props.children}
    </div>
  );
};

export default Column;
