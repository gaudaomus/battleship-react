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

  const randomizeShips = (num1, num2) => {
    let shipPositions = [];
    for (let i = allShips.length; i > 0; i--) {
      //0=horizontal, 1=vertical
      const orientation = Math.floor(Math.random() * 2);
      let origin = [Math.floor(Math.random() * 64) + num1];
      let randPos = randomPositions(
        i - 1,
        orientation,
        origin,
        shipPositions,
        num2
      );
      while (randPos.condition !== true) {
        origin = [Math.floor(Math.random() * 64) + num1];
        randPos = randomPositions(
          i - 1,
          orientation,
          origin,
          shipPositions,
          num2
        );
      }
      shipPositions = shipPositions.concat(randPos.origin);
      allShips[i - 1].setPosition(randPos.origin);
    }
    return shipPositions;
  };

  const randomPositions = (j, orientation, origin, shipPositions, num2) => {
    if (orientation === 0) {
      for (j; j > 0; j--) {
        origin.push(origin[0] + j);
      }
    } else if (orientation === 1) {
      for (j; j > 0; j--) {
        origin.push(origin[0] + j * 8);
      }
    }

    if (orientation === 0) {
      if (
        Math.max(...origin) < num2 + 1 &&
        !origin.some((event) => shipPositions.includes(event)) &&
        (origin.every((event) => event > num2 - 64 && event < num2 - 55) ||
          origin.every((event) => event > num2 - 56 && event < num2 - 47) ||
          origin.every((event) => event > num2 - 48 && event < num2 - 39) ||
          origin.every((event) => event > num2 - 40 && event < num2 - 31) ||
          origin.every((event) => event > num2 - 32 && event < num2 - 23) ||
          origin.every((event) => event > num2 - 24 && event < num2 - 15) ||
          origin.every((event) => event > num2 - 16 && event < num2 - 7) ||
          origin.every((event) => event > num2 - 8 && event < num2 +1))
      ) {
        return { condition: true, origin };
      } else {
        return { condition: false, origin };
      }
    } else if (orientation === 1) {
      if (
        Math.max(...origin) < num2 + 1 &&
        !origin.some((event) => shipPositions.includes(event))
      ) {
        return { condition: true, origin };
      } else {
        return { condition: false, origin };
      }
    }
  };

  const receiveAttack = (shot) => {
    let misses = 0;
    for (let i = 0; i < allShips.length; i++) {
      if (allShips[i].position.indexOf(shot) >= 0) {
        allShips[i].hit(shot);
        hitShots.push(shot);
        if (allSunk()) {
          return true;
        }
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
    randomizeShips,
    shipOne,
    shipTwo,
    shipThree,
    shipFour,
    shipFive,
  };
};

const Player = (name, enemyBoard) => {
  const fireShot = (shot) => {
    if (
      !(enemyBoard.hitShots.indexOf(shot) >= 0) &&
      !(enemyBoard.missedShots.indexOf(shot) >= 0)
    ) {
      if (enemyBoard.receiveAttack(shot)){
        alert(`${name} won!`)
      };
      return true;
    } else {
      return false;
    }
  };

  return { fireShot };
};

export { Ship, Gameboard, Player };
