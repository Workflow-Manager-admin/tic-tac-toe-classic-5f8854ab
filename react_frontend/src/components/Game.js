import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [boardState, setBoardState] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isVsAI, setIsVsAI] = useState(false);
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getAIMove = (squares) => {
    // Basic AI: Choose first available empty square
    const emptySquares = squares
      .map((square, index) => square === null ? index : null)
      .filter(val => val !== null);
    
    if (emptySquares.length === 0) return null;
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  const handleClick = (i) => {
    if (boardState[i] || calculateWinner(boardState)) return;

    const newBoardState = [...boardState];
    newBoardState[i] = isXNext ? 'X' : 'O';
    setBoardState(newBoardState);
    setIsXNext(!isXNext);

    // AI move
    if (isVsAI && !isXNext) {
      setTimeout(() => {
        const aiMove = getAIMove(newBoardState);
        if (aiMove !== null) {
          const aiBoardState = [...newBoardState];
          aiBoardState[aiMove] = 'O';
          setBoardState(aiBoardState);
          setIsXNext(true);
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setBoardState(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(boardState);
  const isDraw = !winner && boardState.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-status">{status}</div>
      <Board squares={boardState} onClick={handleClick} />
      <div className="game-controls">
        <button 
          className="game-button"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <button 
          className="game-button"
          onClick={() => {
            setIsVsAI(!isVsAI);
            resetGame();
          }}
        >
          {isVsAI ? 'Play vs Human' : 'Play vs AI'}
        </button>
      </div>
    </div>
  );
};

export default Game;
