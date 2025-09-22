const games = new Map();

// Function to insert newlines after every 5 words
function formatPhrase(phrase) {
  const words = phrase.split(' ');
  const result = [];
  
  for (let i = 0; i < words.length; i++) {
    if (i > 0 && i % 5 === 0) {
      // Add newline after every 5 words (except the first word)
      result.push('\n');
    } else if (i > 0) {
      // Add space between words on the same line
      result.push(' ');
    }
    result.push(words[i]);
  }
  
  return result.join('');
}

games.set( '08df8966-02f2-4de6-90f1-e401eca38a9f', {
  phrase: formatPhrase('This is a test!'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Player 1"
} );

games.set( 'd77d32d5-9ca2-4e03-9d09-66163624b56a', {
  phrase: formatPhrase('Your ability to think critically while keeping the big picture in mind inspires everyone around you. The way you lead with responsibility, ownership, and servant leadership sets a powerful example of integrity and vision.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Jagan"
} );

games.set( '064b1408-3680-4b6d-914c-88ed9899999e', {
  phrase: formatPhrase('Your obsession with code quality shows your deep respect for the craft, and it raises the standard for everyone. The balance of collaboration, learning, and servant leadership you bring makes the team stronger every day.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Jullone"
} );

games.set( '156df8a8-bc5a-41b4-afad-64cc3c79f693', {
  phrase: formatPhrase('Your adaptability and passion for the craft create an energy that motivates the whole team. Coupled with your empathy and sense of responsibility, you embody both skill and heart in your work.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Darren"
} );

games.set( 'baba02ab-5af5-470e-b811-dd48a404073a', {
  phrase: formatPhrase('You bring out the best in others through your collaborative spirit and adaptable mindset. Your commitment to continuous growth makes you a role model for resilience and improvement.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Alex"
} );

games.set( '71f94804-32a8-468e-b4c4-a259115d4839', {
  phrase: formatPhrase('Your proactive mindset and sharp analytical thinking allow you to navigate challenges with confidence. The way you collaborate ensures that solutions are both thoughtful and impactful.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Stephen"
} );

games.set( 'df159d69-e601-4428-b3d3-95150dc0338b', {
  phrase: formatPhrase('Your curiosity and dedication to continuous learning demonstrate humility and a true growth mindset. Paired with strong analytical thinking, you bring clarity and insight to complex problems.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Marat"
} );

games.set( 'a98b8c73-50e5-4390-aae4-9a8edeb39b64', {
  phrase: formatPhrase('Your collaborative approach makes every project smoother and more enjoyable. By owning responsibilities and adapting with grace, you ensure consistent and reliable outcomes.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Dhruvin"
} );

games.set( 'c345273c-f140-41d9-ae9a-7a7f0473e8be', {
  phrase: formatPhrase('Your technical expertise and problem-solving skills are a foundation the team can always rely on. You pair that with a strong sense of ownership, which makes your contributions invaluable.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Vasilii"
} );

games.set( '8effe416-71de-416b-bf9b-97d4b4b77afc', {
  phrase: formatPhrase('Your reliability and ownership provide a steady anchor for the team. The empathy and humility you bring foster trust and make working with you a joy.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Kavitha"
} );

games.set( '344dc85a-3c32-4a3d-9d07-b4424cdc02ad', {
  phrase: formatPhrase('Your adaptability and commitment to learning keep you ready for any challenge. With collaboration at your core, you strengthen every team you are part of.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Hamza"
} );

games.set( 'd35b2f58-f29e-4bab-afb8-ed65c38eefb0', {
  phrase: formatPhrase('You combine technical expertise with adaptability in a way that\'s rare and inspiring. Your collaborative nature ensures that knowledge is shared and successes are collective.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Pratik"
} );

games.set( '8876b912-4741-4294-9d62-220d353aeecb', {
  phrase: formatPhrase('Your strong work ethic and adaptability make you a dependable teammate in every situation. By collaborating openly, you help the team move forward as one.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Vahid"
} );

games.set( 'efbb24b0-9b3f-40ae-af33-b2f29e83e9e7', {
  phrase: formatPhrase('Your work ethic shines through in everything you take on, and you never shy away from responsibility. Paired with adaptability, you are a dependable force no matter the circumstances.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Balaji"
} );

games.set( 'c9a1d45b-68a0-4eb4-b845-92f54da4271b', {
  phrase: formatPhrase('Your collaborative energy and adaptability make you a catalyst for progress. The ownership you demonstrate ensures that nothing is left incomplete or overlooked.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Venkata"
} );

games.set( 'f2b55245-f7dc-47ba-ae43-1c1688a2f7f1', {
  phrase: formatPhrase('Your problem-solving skills paired with adaptability make you a true troubleshooter. Through collaboration, you amplify not only your own strengths but those of the entire team.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Kingsuk"
} );

games.set( 'e779f81e-3fdf-481e-96c3-9e3b1e19651c', {
  phrase: formatPhrase('Your adaptability allows you to thrive in changing environments, and you tackle challenges head-on. With strong collaboration and problem-solving, you make teamwork both effective and enjoyable.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Anirban"
} );

games.set( '3dd688af-0e7e-4641-91a2-0c808bc3a379', {
  phrase: formatPhrase('You bring adaptability and problem-solving together in a way that delivers consistent results. Your collaborative style makes even the toughest challenges feel approachable.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Devendra"
} );

games.set( 'de10c049-c830-4fa6-a795-488ca80afa41', {
  phrase: formatPhrase('Your problem-solving ability shows a deep analytical mind, and you adapt seamlessly when needed. Your collaborative spirit makes you a trusted partner in any project.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Ashutosh"
} );

games.set( 'e3ecb0e0-051f-4f30-813a-bf68be6bd645', {
  phrase: formatPhrase('Your passion for the craft shines through in everything you build. Combined with adaptability and collaboration, you elevate both your work and your teammates.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Raunak"
} );

games.set( '4f87e687-b1f9-4fd9-9e19-77d49ab546ec', {
  phrase: formatPhrase('Your passion for the craft fuels not only your own performance but also inspires others. With strong work ethic and ownership, you drive projects to success with reliability.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Gokul"
} );

games.set( 'e855f1d8-4f7d-4a66-ae4e-43f460ef2721', {
  phrase: formatPhrase('Your technical expertise and strong work ethic are cornerstones of the team\'s success. By continually sharpening the saw, you ensure growth and excellence never stop.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Ruchita"
} );

games.set( 'd2d389c8-117e-4964-ae8a-878f51717995', {
  phrase: formatPhrase('Your passion for the craft is matched by your emotional intelligence and empathy. This rare combination makes you both an incredibly valuable asset and a source of inspiration for your teammates.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Martin"
} );

games.set( '34a0cf06-9723-40c0-b210-3612d6c1ab64', {
  phrase: formatPhrase('Your analytical thinking and technical expertise bring precision and depth to your work. Combined with adaptability, you turn challenges into opportunities.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Venkatesh"
} );

games.set( '76a9949e-401a-42d2-a022-516866e0be56', {
  phrase: formatPhrase('Your clear communication and strong organizational skills keep the team aligned and efficient. With adaptability, you make transitions and challenges seem effortless.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Robert"
} );

games.set( 'e7a36123-f699-4b1e-9bc2-b16d99b88f5d', {
  phrase: formatPhrase('Your ability to stay organized and communicate effectively keeps everyone on track. With a keen eye for risk management, you provide both clarity and security to the team.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Naveena"
} );

games.set( 'bdaf5da1-0e0b-4ba4-8021-77032af2c0a4', {
  phrase: formatPhrase('Ketan, your technical expertise and sharp analytical thinking allow you to break down even the most complex challenges with clarity. The way you approach problem-solving not only delivers strong solutions but also inspires confidence in everyone around you.'),
  guessedLetters: [],
  mistakes: 0,
  status: 'in_progress',
  playerName: "Ketan"
} );

module.exports = games;
