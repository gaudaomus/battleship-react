import React, { useEffect } from "react";
import Header from "./Components/header";
import PlayerBattleground from "./Components/playerBattleground";
import ComputerBattleground from "./Components/computerBattleground";
import { Player, Gameboard } from "./Scripts/factories";

function App() {
  const humanBoard = Gameboard();
  const computerBoard = Gameboard();
  const humanPlayer = Player("Human", computerBoard);
  const computerPlayer = Player("Computer Overlord", humanBoard);

  useEffect(() => {
    const grid = document.querySelectorAll(".grid");

    const DOMShooter = (i) => {
      if (i.getAttribute("data-key") < 65) {
        if (humanPlayer.fireShot(parseInt(i.getAttribute("data-key")))) {
          for (let j = 0; j < computerBoard.hitShots.length; j++) {
            document
              .querySelector(`[data-key='${computerBoard.hitShots[j]}']`)
              .classList.add("hit");
          }
          for (let k = 0; k < computerBoard.missedShots.length; k++) {
            document
              .querySelector(`[data-key='${computerBoard.missedShots[k]}']`)
              .classList.add("miss");
          }
          setTimeout(() => {
            let compShot = Math.floor(Math.random() * 64) + 65;
            while (!computerPlayer.fireShot(compShot)) {
              compShot = Math.floor(Math.random() * 64) + 65;
            }
            for (let j = 0; j < humanBoard.hitShots.length; j++) {
              document
                .querySelector(`[data-key='${humanBoard.hitShots[j]}']`)
                .classList.add("hit");
            }
            for (let k = 0; k < humanBoard.missedShots.length; k++) {
              document
                .querySelector(`[data-key='${humanBoard.missedShots[k]}']`)
                .classList.add("miss");
            }
          }, 50);
        }
      }
    };

    grid.forEach((i) => {
      i.addEventListener("click", () => {
        DOMShooter(i);
      });
    });

    return () => {
      grid.forEach((i) => {
        i.removeEventListener("click", () => {
          DOMShooter(i);
        });
      });
    };
  }, []);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <PlayerBattleground playerName="Player" board={humanBoard} />
        <ComputerBattleground playerName="Computer" board={computerBoard} />
      </div>
    </div>
  );
}

export default App;
