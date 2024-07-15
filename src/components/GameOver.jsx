export default function GameOver({ winner, onRematch }){
    let winContent = <p>{winner} won!</p>
    if(!winner)
        winContent = <p>Draw!!</p>

    return (
        <div id ="game-over">
            <h2>Game Over!</h2>
            {winContent}
            <button onClick={onRematch}>Rematch!</button>
        </div>
    );
}