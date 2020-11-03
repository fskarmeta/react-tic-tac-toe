import React, { useState } from "react";
import "./App.css";

function App() {
  const [hide, setHide] = useState(false);
  const [cuadrados, cambiarCuadrados] = useState(Array(9).fill(null));
  const [jugador, cambiarJugador] = useState(true);
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

  // Ocultar elementos
  const hider = { display: "none" };
  const shower = { display: "inherit" };

  function hideToggler() {
    if (hide) {
      // Vaciar los arrays
      cambiarCuadrados(Array(9).fill(null));
      // Reiniciar Usernames
      // setUsername({player1: null, player2:null})
    }
    setHide(!hide);
  }

  // Jugador Uno y Ocultar Elementos
  function hideToggler1() {
    setHide(!hide);
    cambiarJugador(true);
  }

  // Jugador Dos y Ocultar Elementos
  function hideToggler2() {
    setHide(!hide);
    cambiarJugador(false);
  }

  //Clik en cuadrados
  function handeClick(i) {
    //Copia de los cuadrados actuales
    const nuevosCuadrados = [...cuadrados];
    // Si tiene substancia retornar (evitar doble click) O si hubo un ganador
    if (ganadora(cuadrados) || nuevosCuadrados[i]) return;
    //  Especificar si entra X o O
    nuevosCuadrados[i] = jugador ? "X" : "O";
    // Actualizar cuadrados en el state
    cambiarCuadrados(nuevosCuadrados);
    // Intercalar X y O
    cambiarJugador(!jugador);
  }

  // Definir ganador
  const ganador = ganadora(cuadrados);

  // Cuando hay empate
  const empate = cuadrados.includes(null);

  //  Si no hay Empate => Ganador => Si no hay Ganador => Siguiente jugador
  let turno;
  turno = empate ?
  ganador
    ? jugador
      ? `Winner is: ${username.player2}  (${ganador})`
      : `Winner is: ${username.player1}  (${ganador})`
    : `Next player: ${
        jugador ? username.player1 + " (X) " : username.player2 + " (O) "
      }` : "Draw";

  //Función para saber si se cumplío una combinación ganadora
  function ganadora(arr) {
    let combinaciones = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combinaciones.length; i++) {
      const [a, b, c] = combinaciones[i];
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
          {cuadrados.map((e, i) => (
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
