const Ship = () => {
  let position = [];
  let positionHit = [];

  const setPosition = (coord) => {
    for (let i = 0; i < coord.length; i++) {
      position[i] = coord[i];
    }
  };

  const hit = (target) => {
    if (position.indexOf(target) >= 0 && !(positionHit.indexOf(target) >= 0)) {
      positionHit.push(target);
    }
  };

  const isSunk = () => {
    if (positionHit.length === position.length) {
      return true;
    } else {
      return false;
    }
  };

  return { position, positionHit, setPosition, hit, isSunk };
};

const Gameboard = () => {
  let shipOne = Ship();
  let shipTwo = Ship();
  let shipThree = Ship();
  let shipFour = Ship();
  let shipFive = Ship();

  let allShips = [shipOne, shipTwo, shipThree, shipFour, shipFive];
  let missedShots = [];
  let hitShots = [];

  const receiveAttack = (shot) => {
    let misses = 0;
    for (let i = 0; i < allShips.length; i++) {
      if (allShips[i].position.indexOf(shot) >= 0) {
        allShips[i].hit(shot);
        hitShots.push(shot);
      } else {
        misses += 1;
      }
    }
    if (misses === allShips.length) {
      missedShots.push(shot);
    }
  };

  const allSunk = () => {
    let sunk = 0;
    for (let i = 0; i < allShips.length; i++) {
      if (allShips[i].isSunk() === false) {
        break;
      } else {
        sunk += 1;
      }
    }
    if (sunk === allShips.length) {
      return true;
    } else {
      return false;
    }
  };

  return {
    hitShots,
    missedShots,
    receiveAttack,
    allSunk,
    shipOne,
    shipTwo,
    shipThree,
    shipFour,
    shipFive,
  };
};

const Player = (enemyBoard) => {

  const fireShot = (shot) => {
    if (
      !(enemyBoard.hitShots.indexOf(shot) >= 0) &&
      !(enemyBoard.missedShots.indexOf(shot) >= 0)
    ) {
      enemyBoard.receiveAttack(shot);
      return true;
    } else {
      return false;
    }
  };

  return { fireShot };
};

export { Ship, Gameboard, Player };
