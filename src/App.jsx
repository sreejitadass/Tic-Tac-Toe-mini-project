import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  let winner = null;

  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
      break;
    }
  }

  const hasDraw = !winner && gameTurns.length === 9;

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] || winner) return; // Prevent further moves if the cell is already filled or there's a winner

    setGameTurns(prevTurns => {
      const curPlayer = activePlayer;
      setActivePlayer(curPlayer === 'X' ? 'O' : 'X');
      return [{ square: { rowIndex, colIndex }, player: curPlayer }, ...prevTurns];
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  return (
    <>
      <Header />

      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player-1" symbol="X" isActive={activePlayer === 'X'} />
            <Player initialName="Player-2" symbol="O" isActive={activePlayer === 'O'} />
          </ol>
          {(winner || hasDraw) && <GameOver winner = {winner} onRematch = {handleRematch}/>}
          <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
        </div>
      </main>

      <Log turns={gameTurns} />
    </>
  );
}

export default App;
