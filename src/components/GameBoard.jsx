export default function GameBoard({ onSelectSquare, gameBoard }) {
    return (
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, playerSymbolIndex) => (
                <li key={playerSymbolIndex}>
                  <button onClick={() => onSelectSquare(rowIndex, playerSymbolIndex)} disabled = {playerSymbol ? true : false}>{playerSymbol}</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }
  