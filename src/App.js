import { useState, useEffect } from 'react';

import './App.css';
import Input from './components/Input/Input';
import Node from './components/Node/Node';
import AStar from './helper/AStar';




const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 1, y: 4 });
  const [homePosition, sethomePosition] = useState({ x: 2, y: 6 });
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);

  useEffect(() => {
    const getInitialGrid = () => {
      const grid = [];
      for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 20; col++) {
          currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
      }
      return grid;
    };

    const createNode = (col, row) => {
      return {
        col,
        row,
        isStart: row === mousePosition.x - 1 && col === mousePosition.y - 1,
        isFinish: row === homePosition.x - 1 && col === homePosition.y - 1,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
      };
    };

    const grid = getInitialGrid();
    setGrid(grid);
  }, [mousePosition, homePosition]);

  const handleMouseXChange = (event) => {
    setMousePosition((prevState) => {
      return {
        ...prevState,
        x: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

  const handleMouseYChange = (event) => {
    setMousePosition((prevState) => {
      return {
        ...prevState,
        y: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

  const handlehomeXChange = (event) => {
    sethomePosition((prevState) => {
      return {
        ...prevState,
        x: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

  const handlehomeYChange = (event) => {
    sethomePosition((prevState) => {
      return {
        ...prevState,
        y: event.target.value ? parseInt(event.target.value) : 0,
      };
    });
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;

    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const resetBoard = () => {
    window.location.reload();
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i].split(',');
        document.getElementById(`node-${node[0]}-${node[1]}`).className =
          'node node-visited';
      }, 10 * i);
    }
  };

 

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i].split(',');

        document.getElementById(`node-${node[0]}-${node[1]}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  };

  const visualizeAStar = () => {
    if (grid.length === 0) return;

    const startNode = grid[mousePosition.x - 1][mousePosition.y - 1];
    const finishNode = grid[homePosition.x - 1][homePosition.y - 1];

     const algorithm = new AStar();

    algorithm.elMap = grid;

    const [visitedNodesInOrder, nodesInShortestPathOrder] = algorithm.search(
      startNode,
     finishNode
   );

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);



  };

  return (
    <div className='App bg-cover bg-center'>
      <div className='rain'>
      <div className='flex flex-column py-6 mx-auto '>
        <div className='flex  items-center space-x-4 mr-20'>
          <label>👨‍🎓</label>
          <Input
            value={mousePosition.x}
            onChange={(e) => handleMouseXChange(e)}
          />
          <Input
            value={mousePosition.y}
            onChange={(e) => handleMouseYChange(e)}
          />
        </div>
        <div className='space-x-4'>
          <button
            className='px-4 py-2 text-sm font-medium text-black'
            onClick={() => visualizeAStar()}
          >
            Visualize A* Search
          </button>
          <button
            className='px-4 py-2 text-sm font-medium  rounded-md'
            onClick={() => resetBoard()}
          >
            Reset
          </button>
        </div>
        <div className='flex items-center space-x-4 ml-20'>
          <label>🏡</label>
          <Input
            value={homePosition.x}
            onChange={(e) => handlehomeXChange(e)}
          />
          <Input
            value={homePosition.y}
            onChange={(e) => handlehomeYChange(e)}
          />
        </div>
      </div>

      <div className='grid'>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={isMousePressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}

      </div>

      </div>
    </div>
  );
};

export default App;
