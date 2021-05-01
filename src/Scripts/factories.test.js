import { Gameboard } from "./factories";

test("all ships sunk", () => {
  const myBoard = Gameboard();
  myBoard.shipOne.setPosition([1, 2, 3]);
  myBoard.shipTwo.setPosition([4, 5, 6]);
  myBoard.shipThree.setPosition([7, 8, 9]);
  myBoard.shipFour.setPosition([10, 11, 12]);
  myBoard.shipFive.setPosition([13, 14, 15]);
  for (let i = 0; i < 20; i++) {
    myBoard.receiveAttack(i);
  }
  expect(myBoard.allSunk()).toBe(true);
});

test("not all ships sunk", () => {
  const myBoard = Gameboard();
  myBoard.shipOne.setPosition([1, 2, 3]);
  myBoard.shipTwo.setPosition([4, 5, 6]);
  myBoard.shipThree.setPosition([7, 8, 9]);
  myBoard.shipFour.setPosition([10, 11, 12]);
  myBoard.shipFive.setPosition([13, 14, 15]);
  myBoard.receiveAttack(1);
  myBoard.receiveAttack(2);
  myBoard.receiveAttack(3);
  myBoard.receiveAttack(4);
  myBoard.receiveAttack(6);
  myBoard.receiveAttack(7);
  myBoard.receiveAttack(17);
  expect(myBoard.missedShots).toStrictEqual([17]);
  expect(myBoard.allSunk()).toBe(false);
});
