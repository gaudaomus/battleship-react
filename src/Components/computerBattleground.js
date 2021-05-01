import React, { useState, useEffect } from "react";

const PlayerBattleground = (props) => {
  
  const gridArray = [...Array(65).keys()].slice(1);

  const shipOnePosition = [1,2,3,4];
  const shipPositions = [].concat(shipOnePosition);
  props.board.shipOne.setPosition(shipOnePosition);

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
