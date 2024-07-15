import { useState } from "react";

export default function Player({initialName, symbol, isActive}){
    const [ enteredPlayerName, setEnteredPlayerName ] = useState(initialName);
    const [ isEditing, setIsEditing ] = useState(false);

    function changeNameHandler(event){
        setEnteredPlayerName(event.target.value);
    }

    function editHandler(){
        setIsEditing((editing) => !editing);
    }

    //default value
    let playerName = <span className="player-name">{enteredPlayerName}</span>
    let buttonMessage = 'Edit'
    if(isEditing)
    {
        playerName = <input type="text" required value={enteredPlayerName} onChange={changeNameHandler}/>;
        buttonMessage = 'Save';
    }

    return(
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick = {editHandler}>{buttonMessage}</button>
        </li>
    );
}