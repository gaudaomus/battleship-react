import React, { useState, useEffect } from "react";
import Header from "./Components/header";
import PlayerBattleground from "./Components/playerBattleground";
import ComputerBattleground from "./Components/computerBattleground";
import { Player, Gameboard } from "./Scripts/factories";

function App() {
  const humanBoard = Gameboard();
  const computerBoard = Gameboard();
  const humanPlayer = Player(computerBoard);
  const computerPlayer = Player(humanBoard);

  const [turn, setTurn] = useState("compooter");

  useEffect(() => {
    const grid = document.querySelectorAll(".grid");
    grid.forEach((i) => {
      i.addEventListener("click", () => {
        if (turn === "hooman" && i.getAttribute("data-key") < 65) {
          if (humanPlayer.fireShot(parseInt(i.getAttribute("data-key")))) {
            for (let i = 0; i < computerBoard.hitShots.length; i++) {
              document
                .querySelector(`[data-key='${computerBoard.hitShots[i]}']`)
                .classList.add("hit");
            }
            for (let i = 0; i < computerBoard.missedShots.length; i++) {
              document
                .querySelector(`[data-key='${computerBoard.missedShots[i]}']`)
                .classList.add("miss");
            }
            setTurn("compooter");
          }
        } else if (turn === "compooter" && i.getAttribute("data-key") > 64) {
          if (computerPlayer.fireShot(parseInt(i.getAttribute("data-key")))) {
            for (let i = 0; i < humanBoard.hitShots.length; i++) {
              document
                .querySelector(`[data-key='${humanBoard.hitShots[i]}']`)
                .classList.add("hit");
            }
            for (let i = 0; i < humanBoard.missedShots.length; i++) {
              document
                .querySelector(`[data-key='${humanBoard.missedShots[i]}']`)
                .classList.add("miss");
            }
            setTurn("hooman");
          }
        }
      });
    });

    return () => {
      grid.forEach((i) => {
        i.removeEventListener("click", () => {
          if (turn === "hooman" && i.getAttribute("data-key") < 65) {
            if (humanPlayer.fireShot(parseInt(i.getAttribute("data-key")))) {
              for (let i = 0; i < computerBoard.hitShots.length; i++) {
                document
                  .querySelector(`[data-key='${computerBoard.hitShots[i]}']`)
                  .classList.add("hit");
              }
              for (let i = 0; i < computerBoard.missedShots.length; i++) {
                document
                  .querySelector(`[data-key='${computerBoard.missedShots[i]}']`)
                  .classList.add("miss");
              }
              setTurn("compooter");
            }
          } else if (turn === "compooter" && i.getAttribute("data-key") > 64) {
            if (computerPlayer.fireShot(parseInt(i.getAttribute("data-key")))) {
              for (let i = 0; i < humanBoard.hitShots.length; i++) {
                document
                  .querySelector(`[data-key='${humanBoard.hitShots[i]}']`)
                  .classList.add("hit");
              }
              for (let i = 0; i < humanBoard.missedShots.length; i++) {
                document
                  .querySelector(`[data-key='${humanBoard.missedShots[i]}']`)
                  .classList.add("miss");
              }
              setTurn("hooman");
            }
          }
        });
      });
    };
  },[turn]);

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
