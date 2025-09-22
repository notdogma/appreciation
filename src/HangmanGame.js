// HangmanGame.js

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HangmanCanvas from "./HangmanCanvas";
import "./HangmanGame.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const HangmanGame = () => {
  const { gameId: urlGameId } = useParams();
  const navigate = useNavigate();
  const [ phrase, setWord ] = useState( "" );
  const [ wordDisplay, setWordDisplay ] = useState( "" );
  const [ guessedLetters, setGuessedLetters ] = useState( [] );
  const [ mistakes, setMistakes ] = useState( 0 );
  const [ gameStatus, setGameStatus ] = useState( "in_progress" );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState( null );
  const [ playerName, setPlayerName ] = useState( "" );

  console.log( 'Game created with ID:', urlGameId )

  // Handle player guesses
  const handleGuess = async ( letter ) => {
    if ( gameStatus !== 'in_progress' || guessedLetters.includes( letter ) || !urlGameId ) {
      return;
    }

    try {
      setLoading( true );
      const response = await fetch( `${API_BASE_URL}/games/${urlGameId}/guesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { letter } ),
      } );

      if ( !response.ok ) {
        const errorData = await response.json();
        if ( errorData.error === 'Letter already guessed' ) {
          return; // Ignore duplicate guesses
        }
        throw new Error( errorData.error || 'Failed to make a guess' );
      }

      const data = await response.json();
      updateGameState( data );
    } catch ( err ) {
      console.error( 'Error making guess:', err );
      setError( err.message || 'Failed to make a guess. Please try again.' );
    } finally {
      setLoading( false );
    }
  };

  // Handle keyboard input
  useEffect( () => {
    const handleKeyDown = ( e ) => {
      // Only process if game is in progress
      if ( gameStatus !== 'in_progress' ) return;
      if (gameStatus !== 'in_progress') return;
      
      const key = e.key.toUpperCase();
      
      // Check if the key is a letter, number, or allowed symbol
      if (/^[A-Z0-9!.,' -]$/i.test(key)) {
        handleGuess(key);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleGuess, gameStatus]);

  // Initialize the game with the provided game ID
  const initializeGame = useCallback( async () => {
    if( !urlGameId ) {
      navigate( '/' );
      return;
    }

    try {
      setLoading( true );
      setError( null );

      // The game should already be created by the GameSetup component
      const response = await fetch( `${API_BASE_URL}/games/${urlGameId}` );

      if( !response.ok ) {
        throw new Error( 'Game not found' );
      }

      // Load the game state
      const gameData = await response.json();
      updateGameState( gameData );
    } catch( err ) {
      console.error( 'Error initializing game:', err );
      setError( 'Failed to load the game. ' + (err.message || '') );
    } finally {
      setLoading( false );
    }
  }, [ urlGameId, navigate ] );

  // This function is no longer needed as we handle game creation in the GameSetup component
  // All games should be created before navigating to this component

  // Update game state from server response
  const updateGameState = ( gameData ) => {
    setWordDisplay( gameData.wordDisplay || '' );
    setGuessedLetters( gameData.guessedLetters || [] );
    setMistakes( gameData.mistakes || 0 );
    setGameStatus( gameData.status || 'in_progress' );
    if( gameData.playerName ) {
      setPlayerName( gameData.playerName );
    }
    if( gameData.status !== 'in_progress' ) {
      console.log( 'gameData: ', gameData );
      setWord( gameData.phrase || '' );
    }
  };

  // Initialize game when component mounts or URL changes
  useEffect( () => {
    if( urlGameId ) {
      initializeGame();
    }
  }, [ urlGameId, initializeGame ] );

  const isGameWon = () => gameStatus === 'won';
  const isGameLost = () => gameStatus === 'lost';

  return (
    <div className="hangman-container">
      <h1>Appreciation Guessing Game</h1>
      {playerName && <h2>Welcome, {playerName}!</h2>}
      <h5>
        I'm going to make you work for my appreciation message! Fill in the letters to figure out my message. Have fun!
      </h5>
      <HangmanCanvas mistakes={mistakes}/>
      {error && <div className="error-message">{error}</div>}
      <div className="word-display">
        {wordDisplay.split( '\n' ).map( ( line, lineIndex, lines ) => (
          <div key={lineIndex} className="word-line">
            {line.split( '' ).map( ( letter, index ) => (
              <span key={`${lineIndex}-${index}`} className="letter">
                {letter}
              </span>
            ) )}
            {lineIndex < lines.length - 1 && <br className="line-break"/>}
          </div>
        ) )}
      </div>
      <div className="keyboard">
        {/* Number Row */}
        <div className="keyboard-row">
          {[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ].map( ( number ) => {
            const isGuessed = guessedLetters.includes( number );
            const isWrongGuess = isGuessed && phrase && !phrase.includes( number );
            return (
              <button
                key={number}
                onClick={() => handleGuess( number )}
                disabled={loading || isGuessed || gameStatus !== 'in_progress'}
                className={`keyboard-key number-key ${isGuessed ? 'guessed' : ''} ${isWrongGuess ? 'wrong' : ''}`}
              >
                {number}
              </button>
            );
          } )}
        </div>

        {/* QWERTY Keyboard Layout */}
        <div className="keyboard-row">
          {[ 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ].map( ( letter ) => {
            const isGuessed = guessedLetters.includes( letter );
            const isWrongGuess = isGuessed && phrase && !phrase.includes( letter );
            return (
              <button
                key={letter}
                onClick={() => handleGuess( letter )}
                disabled={loading || isGuessed || gameStatus !== 'in_progress'}
                className={`keyboard-key ${isGuessed ? 'guessed' : ''} ${isWrongGuess ? 'wrong' : ''}`}
              >
                {letter}
              </button>
            );
          } )}
        </div>

        <div className="keyboard-row">
          <div className="keyboard-spacer"></div>
          {[ 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L' ].map( ( letter ) => {
            const isGuessed = guessedLetters.includes( letter );
            const isWrongGuess = isGuessed && phrase && !phrase.includes( letter );
            return (
              <button
                key={letter}
                onClick={() => handleGuess( letter )}
                disabled={loading || isGuessed || gameStatus !== 'in_progress'}
                className={`keyboard-key ${isGuessed ? 'guessed' : ''} ${isWrongGuess ? 'wrong' : ''}`}
              >
                {letter}
              </button>
            );
          } )}
          <div className="keyboard-spacer"></div>
        </div>

        <div className="keyboard-row">
          {[ 'Z', 'X', 'C', 'V', 'B', 'N', 'M' ].map( ( letter ) => {
            const isGuessed = guessedLetters.includes( letter );
            const isWrongGuess = isGuessed && phrase && !phrase.includes( letter );
            return (
              <button
                key={letter}
                onClick={() => handleGuess( letter )}
                disabled={loading || isGuessed || gameStatus !== 'in_progress'}
                className={`keyboard-key ${isGuessed ? 'guessed' : ''} ${isWrongGuess ? 'wrong' : ''}`}
              >
                {letter}
              </button>
            );
          } )}
        </div>

        <div className="keyboard-row">
          <button
            key="space"
            onClick={() => handleGuess( ' ' )}
            disabled={loading || guessedLetters.includes( ' ' ) || gameStatus !== 'in_progress'}
            className={`keyboard-key space-key ${guessedLetters.includes( ' ' ) ? 'guessed' : ''} ${guessedLetters.includes( ' ' ) && phrase && !phrase.includes( ' ' ) ? 'wrong' : ''}`}
          >
            Space
          </button>
          <button
            key="comma"
            onClick={() => handleGuess( ',' )}
            disabled={loading || guessedLetters.includes( ',' ) || gameStatus !== 'in_progress'}
            className={`keyboard-key ${guessedLetters.includes( ',' ) ? 'guessed' : ''} ${guessedLetters.includes( ',' ) && phrase && !phrase.includes( ',' ) ? 'wrong' : ''}`}
          >
            ,
          </button>
          <button
            key="period"
            onClick={() => handleGuess( '.' )}
            disabled={loading || guessedLetters.includes( '.' ) || gameStatus !== 'in_progress'}
            className={`keyboard-key ${guessedLetters.includes( '.' ) ? 'guessed' : ''} ${guessedLetters.includes( '.' ) && phrase && !phrase.includes( '.' ) ? 'wrong' : ''}`}
          >
            .
          </button>
        </div>

        <div className="keyboard-row">
          <button
            key="exclamation"
            onClick={() => handleGuess( '!' )}
            disabled={loading || guessedLetters.includes( '!' ) || gameStatus !== 'in_progress'}
            className={`keyboard-key ${guessedLetters.includes( '!' ) ? 'guessed' : ''} ${guessedLetters.includes( '!' ) && phrase && !phrase.includes( '!' ) ? 'wrong' : ''}`}
          >
            !
          </button>
          <button
            key="dash"
            onClick={() => handleGuess( '-' )}
            disabled={loading || guessedLetters.includes( '-' ) || gameStatus !== 'in_progress'}
            className={`keyboard-key ${guessedLetters.includes( '-' ) ? 'guessed' : ''} ${guessedLetters.includes( '-' ) && phrase && !phrase.includes( '-' ) ? 'wrong' : ''}`}
          >
            -
          </button>
          <button
            key="apostrophe"
            onClick={() => handleGuess( "'" )}
            disabled={loading || guessedLetters.includes( "'" ) || gameStatus !== 'in_progress'}
            className={`keyboard-key ${guessedLetters.includes( "'" ) ? 'guessed' : ''} ${guessedLetters.includes( "'" ) && phrase && !phrase.includes( "'" ) ? 'wrong' : ''}`}
          >
            '
          </button>
        </div>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {isGameWon() && (
        <div className="result-message success">
          🎉 Congratulations! You won! 🎉
        </div>
      )}
      {isGameLost() && (
        <div className="result-message error">
          Game Over! The word was: <strong>{phrase}</strong>
        </div>
      )}
      <button
        className="new-game-button"
        onClick={() => navigate( '/' )}
        disabled={loading}
      >
        New Game
      </button>
    </div>
  );
};

export default HangmanGame;
