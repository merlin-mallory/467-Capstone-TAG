import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PlayGamesRow({game, onPlay}) {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/games/details/${game.game_id}`);
  }

  return (
    <tr>
      <td><FaPlay onClick={handlePlayClick} /></td>
      <td>{game.title} (#{game.game_id})</td>
      <td>{game.created_at.substr(0,10)}</td>
      <td>{game.updated_at.substr(0,10)}</td>
    </tr>
  )
}

export default PlayGamesRow;