
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import PlayGamesList from '../components/PlayGamesList';

function PlayGames() {
  const [gameToPlay, setGameToPlay] = useState(null);

  return (
    <div className="playgames-container">
      <h1>Play Games</h1>
      <PlayGamesList setGameToPlay={setGameToPlay} />
      <button><Link to="/">Home</Link></button>
    </div>
  )
}
export default PlayGames;
