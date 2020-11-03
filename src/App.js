import React, { useState } from "react";
import "./App.css";

function App() {
  const [hide, setHide] = useState(false);
  const [squares, changeSquares] = useState(Array(9).fill(null));
  const [player, changePlayer] = useState(true);
  const [username, setUsername] = useState({ player1: "", player2: "" });

  function handleChangePlayer1(e) {
    setUsername({
      ...username,
      player1: e.target.value,
    });
  }

  function handleChangePlayer2(e) {
    setUsername({
      ...username,
      player2: e.target.value,
    });
  }

  const hider = { display: "none" };
  const shower = { display: "inherit" };

  function hideToggler() {
    if (hide) {
      changeSquares(Array(9).fill(null));
    }
    setHide(!hide);
  }

  function hideToggler1() {
    setHide(!hide);
    changePlayer(true);
  }

  function hideToggler2() {
    setHide(!hide);
    changePlayer(false);
  }


  function handeClick(i) {
    const newSquares = [...squares];
    if (winner(squares) || newSquares[i]) return;
    newSquares[i] = player ? "X" : "O";
    changeSquares(newSquares);
    changePlayer(!player);
  }


  const theWinner = winner(squares);
  const empate = squares.includes(null);


  let turno;
  turno = empate ?
  theWinner
    ? player
      ? `Winner is: ${username.player2}  (${theWinner})`
      : `Winner is: ${username.player1}  (${theWinner})`
    : `Next player: ${
        player ? username.player1 + " (X) " : username.player2 + " (O) "
      }` : "Draw";


  function winner(arr) {
    let combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
        return arr[a];
      }
    }
    return null;
  }

  return (
    <div className="mastercontainer">
      <div className="title">
        <h1>Tic Tac Toe in React.js</h1>
        <spam className="turn">By Bafian</spam>
      </div>
      <div className="overcontainer">
        <span style={hide ? shower : hider} className="turn">
          {turno}
        </span>
        <span style={hide ? hider : shower} className="turn">
          Pick a side!
        </span>

        <button
          className="startover"
          style={hide ? shower : hider}
          onClick={hideToggler}
        >
          Start Over
        </button>
        <div className="firstview" style={hide ? hider : shower}>
          <div className="inputdiv">
            <input
              type="text"
              className="inputs"
              placeholder="Player 1:"
              id="player1"
              name="player1"
              onChange={handleChangePlayer1}
              autocomplete="off"
            />
            <input
              type="text"
              className="inputs"
              placeholder="Player 2:"
              id="player2"
              name="player2"
              onChange={handleChangePlayer2}
              autocomplete="off"
            />
          </div>
          <div className="buttons">
            <button
              type="button"
              className="btn"
              name="X"
              value="X"
              id="X"
              onClick={hideToggler1}
            >
              X
            </button>
            <button
              type="button"
              className="btn"
              name="O"
              value="O"
              id="O"
              onClick={hideToggler2}
            >
              O
            </button>
          </div>
        </div>
        <div className="container" style={hide ? shower : hider}>
          {squares.map((e, i) => (
            <div
              key={i}
              className={`box box${i}`}
              onClick={() => handeClick(i)}
            >
              <span className={i}>{e}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
