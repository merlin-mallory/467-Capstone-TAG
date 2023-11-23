
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import UserGamesList from '../components/UserGamesList';

function MakeGames() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [gameToEdit, setGameToEdit] = useState(null);
  const [gameToPlay, setGameToPlay] = useState(null);

  return (
    <div className="yourgames-container">
      <h1>Your Games</h1>
      <UserGamesList user={user} setGameToEdit={setGameToEdit} setGameToPlay={setGameToPlay} />
      <button><Link to="/">Home</Link></button>
      <button><Link to="/create-new-game">Create Game</Link></button>
    </div>
  )
}
export default MakeGames;
