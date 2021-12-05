import {ITodoItem} from "./interfaces";

const TodoItem: React.FC<ITodoItem> = ({item, onRemove}) => {
  return (
    <li style={{marginTop: 10}}>
      <b>{item.id}</b>: {item.title} 
      <button style={{marginLeft: 10}} onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoItem;