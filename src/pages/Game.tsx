import React, { useEffect, useState } from "react";
import "./game.css";

interface StringMap { [key: string]: string; };
const choices: StringMap = {
  "rock": "scissors", 
  "paper": "rock", 
  "scissors": "paper"
};

export const Game = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState("");
  const [playerName, setPlayerName] = useState("Default Player");

  const choose = (choice: string): undefined => {
    setPlayerChoice(choice);
    
    const computerChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];
    setComputerChoice(computerChoice);

    calculateWinner(choice, computerChoice);
    return;
  };

  const calculateWinner = (yourChoice: string, oppsiteChoice: string) => {
    const winCondition = choices[yourChoice];
    let winner: string = '';
    if (winCondition === oppsiteChoice) {
      winner = playerName;
    } else if (yourChoice === oppsiteChoice) {
      winner = "Nobody";
    } else {
      winner = "Computer";
    }
    setWinner(winner);
    const prevHistory = JSON.parse(JSON.stringify(history));
    prevHistory.push([winner]);
    setHistory(prevHistory);
  };

  const setName = (e: React.FormEvent<HTMLInputElement>) => {
    setPlayerName(e.currentTarget.value);
  }

  useEffect(() => {
  });

  return (
    <div className="text-center">
      <h1>{ 'Hey ' + playerName }</h1>
      <h1>Welcome to Game - Rock Paper Scissors</h1>
      <div className={"flex justify-center"}>
        <div className="w-1/3"> 
          <input type="input" placeholder="Please enter your name" className="input_box" onChange={setName}></input>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <div className="p-6 border shadow w-1/3">
          <div className="flex">
            <div className="w-1/2">
              <div className="choice-text">Your choice</div>
              <div>{ playerChoice !== '' ? playerChoice : 'No Result' }</div>
            </div>
            <div className="w-1/2">
              <div className="choice-text">Computer choice</div>
              <div>{ computerChoice !== '' ? computerChoice : 'No Result' }</div>
            </div>
          </div>
          <div className="mt-6 choice-text">{ 'Winner is ' + winner }</div>
        </div>
      </div>
      <div className={"flex justify-center mt-3"}>
        <button className="select_submit" onClick={() => choose('rock')}>
          rock
        </button>
        <button className="select_submit" onClick={() => choose('paper')}>
          paper
        </button>
        <button className="select_submit" onClick={() => choose('scissors')}>
          scissors
        </button>
      </div>
      <div className="fixed top-0 p-6 border shadow">
        <div className="choice-text">Winner History</div>
        <div className="mt-6">
          { history.map(h => <div>{h}</div>) }
        </div>
      </div>
    </div>
  )
}

export default Game