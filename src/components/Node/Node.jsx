import './Node.css';

const Node = ({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
}) => {
  const extraClassName = isWall ? 'node-wall' : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName} relative`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      <span role='img' className='absolute inset-0'>
        {isFinish ? '🏡' : isStart ? '👨‍🎓' : ''}
      </span>
    </div>
  );
};

export default Node;
