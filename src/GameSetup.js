import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameSetup.css';

const GameSetup = () => {
  const [ gameId, setGameId ] = useState( '' );
  const [ error, setError ] = useState( '' );
  const navigate = useNavigate();

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    const trimmedId = gameId.trim();

    if( !trimmedId ) {
      setError( 'Please enter a game ID' );
      return;
    }

    if( trimmedId.length < 3 ) {
      setError( 'Game ID must be at least 3 characters long' );
      return;
    }

    try {
      // Try to create a new game with this ID
      const response = await fetch( `${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/games/${encodeURIComponent( trimmedId )}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { gameId: trimmedId } )
      } );

      if( !response.ok ) {
        const errorData = await response.json();
        throw new Error( errorData.error || 'Failed to create game' );
      }

      // Navigate to the game if creation was successful
      navigate( `/game/${encodeURIComponent( trimmedId )}` );
    } catch( err ) {
      console.error( 'Error creating game:', err );
      setError( err.message || 'Failed to create game. Please try a different ID.' );
    }
  };

  return (
    <div className="game-setup">
      <h1>Start a New Game</h1>
      <p className="description">
        Enter a your unique game ID to start your appreciation game.
      </p>

      <form onSubmit={handleSubmit} className="game-form">
        <div className="form-group">
          <input
            type="text"
            value={gameId}
            onChange={( e ) => {
              setGameId( e.target.value );
              if( error ) setError( '' );
            }}
            placeholder="Enter game ID"
            className="game-id-input"
            autoFocus
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <button type="submit" className="start-button">
          Start Game
        </button>
      </form>

      <p className="info-tip">
        Tip: Use a unique word or phrase as your game ID. This will be the word others need to guess!
      </p>
    </div>
  );
};

export default GameSetup;
