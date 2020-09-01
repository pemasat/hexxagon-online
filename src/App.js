import React, { useState, useEffect } from 'react';
import './App.css';
import Hexagon from 'react-hexagon'


const ROWS_COUNT = 5;
const COLLS_COUNT = 5;

const defaultGameItem = {
  isSelectedForAction: false,
  isPreselectForMove: false,
  ownToPlayer: undefined,
  positionX: undefined,
  positionY: undefined,
}

function App() {
  const [gameMap, setGameMap] = useState([[]]);


  useEffect(() => {
    const test = Array.from({length: ROWS_COUNT}, (v, i) => i)
      .map((fakeRowItem, rowIndex) => (
        Array.from({length: ROWS_COUNT}, (x, y) => y)
          .map((fakeRowItem, collIndex) => ({...defaultGameItem,
            positionX: collIndex,
            positionY: rowIndex,
          }))
      ));
      console.log({test});
      setGameMap(getMapWithUpdateForHexItem({
        positionX: 1,
        positionY: 1,
        ownToPlayer: 1,
      }, test));

  }, []);

  const getHexItemContentInGameMap = (positionX, positionY, gameMap) =>
    gameMap
      .find((rowItem, rowIndex) => rowIndex === positionY)
      .find((collItem, collIndex) => collIndex === positionX);

  const getMapWithUpdateForHexItem = (newHexItem, gameMap) =>
    gameMap.map((rowItem, rowIndex) => (
        rowItem.map((cellItem, cellIndex) => ({...cellItem,
          ...(newHexItem.positionX === cellIndex && newHexItem.positionY === rowIndex)
            ? newHexItem : {}
        }))
      ));

  // const getMapWithActionHexItem = (positionXForSelected, positionYForSelected)

  // const getPositionOfSelectedHexItem = (gameMap) =>
  //   gameMap.find();

  // const getMapWithUnselectAction = (gameMap) =>
  //   gameMap.

  const test = () => {
    console.log("rtest");
  }

  const handleOnClick = (e, hexItem) => {
    e.preventDefault();
    console.log({hexItem});
    (hexItem.ownToPlayer === undefined)
      ? setGameMap(getMapWithUpdateForHexItem({...hexItem, ownToPlayer: 1}, gameMap))
      : test();
    // setGameMap(getMapWithUpdateForHexItem({...hexItem, ownToPlayer: 1}, gameMap));
  }


  return (
    <div>
      <div className="game">
        {gameMap.map((gameRowItem, rowIndex) => (
          <div className="gameRow" key={rowIndex}>
            {gameRowItem.map((hexItem, hexIndex) => (
              <Hexagon
                className="hexItem"
                key={hexIndex}
                style={{
                  stroke: 'cyan',
                  transition: 'stroke-dasharray 0.7s',
                }}
                backgroundImage={hexItem.ownToPlayer
                  ? "red.png"
                  : "blank.png"
                }

                onClick={(e) => handleOnClick(e, hexItem)}
              >
                <text
                  x="10%"
                  y="40%">{hexItem.positionY}, {hexItem.positionX}</text>
              </Hexagon>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
