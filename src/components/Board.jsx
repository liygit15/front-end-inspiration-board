
const Board = ({id, title, owner, onSelect }) => {
  return (
    <li onClick={() => onSelect(id)}>
        {title} (Owner: {owner})
    </li>
  )
};

export default Board;