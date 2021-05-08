import React from "react";

const PlayerBattleground = (props) => {
  const shipPositions = props.board.randomizeShips(65, 128);

  const gridArray = [...Array(129).keys()].slice(65);

  return (
    <div className="Battlefield">
      <div className="boardName">{props.playerName}</div>
      <div className={`Battlegrid ${props.playerName}`}>
        {gridArray.map((index) => {
          if (shipPositions.indexOf(index) >= 0) {
            return (
              <div className="grid ship" key={index} data-key={index}></div>
            );
          } else {
            return <div className="grid" key={index} data-key={index}></div>;
          }
        })}
      </div>
    </div>
  );
};

export default PlayerBattleground;
