const express = require( 'express' );
const cors = require( 'cors' );
const games = require( './Data' );

const app = express();
const PORT = process.env.PORT || 3001;
const MAX_MISTAKES = 6;

// Middleware
app.use( cors() );
app.use( express.json() );

// Start a new game with custom ID and word
app.post( '/api/games/:gameId', ( req, res ) => {
  console.log( 'Request body: ', req.body )
  console.log( 'Request params: ', req.params )

  // const { gameId } = req.params;
  const { gameId } = req.body;
  console.log( 'gameId: ', gameId )

  if( !gameId ) {
    return res.status( 400 ).json( { error: 'Game ID is required' } );
  }

  if( !games.has( gameId ) ) {
    return res.status( 400 ).json( { error: 'Game ID is not known!!!' } );
  }

  const phrase = games.get( gameId ).phrase;

  if( !phrase || phrase.length < 3 ) {
    return res.status( 400 ).json( { error: 'A valid word with at least 3 characters is required' } );
  }

  // Store the game with the word in uppercase
  const game = games.get( gameId );
  game.upperPhrase = game.phrase.toUpperCase();
  game.guessedLetters = [];
  game.mistakes = 0;
  game.status = 'in_progress';

  console.log( `New game started with ID: ${gameId}, word: ${game.upperPhrase}` );

  res.status( 201 ).json( {
    gameId,
    wordLength: phrase.length,
    status: 'in_progress',
    message: 'Game created successfully',
    playerName: game.playerName
  } );
} );

// Make a guess
app.post( '/api/games/:gameId/guesses', ( req, res ) => {
  const { gameId } = req.params;
  const { letter } = req.body;

  console.log( 'Received guess:', letter );
  if( !letter || letter.length !== 1 ) {
    return res.status( 400 ).json( { error: 'Please provide a single letter' } );
  }

  const game = games.get( gameId );
  if( !game ) {
    return res.status( 404 ).json( { error: 'Game not found' } );
  }

  if( game.status !== 'in_progress' ) {
    return res.status( 400 ).json( {
      error: 'Game is already over',
      status: game.status,
      phrase: game.phrase
    } );
  }

  const upperLetter = letter.toUpperCase();

  // Check if letter was already guessed
  if( game.guessedLetters.includes( upperLetter ) ) {
    return res.status( 400 ).json( { error: 'Letter already guessed' } );
  }

  // Add to guessed letters (if not already guessed and not a newline)
  if( upperLetter !== '\n' && !game.guessedLetters.includes( upperLetter ) ) {
    game.guessedLetters.push( upperLetter );

    // Check if the guess is wrong (only if it's not a newline)
    if( !game.upperPhrase.includes( upperLetter ) ) {
      game.mistakes += 1;
    }
  }

  // Check win/lose conditions (ignore newlines when checking for win)
  const isWon = game.upperPhrase.split( '' ).every( l => l === '\n' || game.guessedLetters.includes( l ) );
  const isLost = game.mistakes >= MAX_MISTAKES;

  if( isWon ) {
    game.status = 'won';
  } else if( isLost ) {
    game.status = 'lost';
  }

  // Prepare response with newline handling
  const response = {
    gameId,
    status: game.status,
    mistakes: game.mistakes,
    guessedLetters: [ ...game.guessedLetters ],
    phrase: game.status !== 'in_progress' ? game.phrase : undefined,
    wordDisplay: game.phrase.split( '' ).map( ( char, i ) => {
      if( char === '\n' ) return '\n';
      const upperChar = char.toUpperCase();
      return game.guessedLetters.includes( upperChar ) ? char : '_';
    } ).join( '' ),
    playerName: game.playerName
  };

  res.json( response );
} );

// Get game status
app.get( '/api/games/:gameId', ( req, res ) => {
  const { gameId } = req.params;
  const game = games.get( gameId );

  console.log( 'Received game status request for gameId:', gameId );

  if( !game ) {
    return res.status( 404 ).json( { error: 'Game not found' } );
  }

  const response = {
    gameId,
    status: game.status,
    mistakes: game.mistakes,
    guessedLetters: [ ...game.guessedLetters ],
    wordLength: game.phrase.length,
    phrase: game.status !== 'in_progress' ? game.phrase : undefined,
    wordDisplay: game.phrase.split( '' ).map( char => {
      if( char === '\n' ) return '\n';
      const upperChar = char.toUpperCase();
      return game.guessedLetters.includes( upperChar ) ? char : '_';
    } ).join( '' ),
    playerName: game.playerName
  };

  res.json( response );
} );

// Start the server
app.listen( PORT, () => {
  console.log( `Server running on http://localhost:${PORT}` );
} );
