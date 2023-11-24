import React from 'react';
import { FaPlay } from 'react-icons/fa';

function PlayGamesRow({game, onPlay}) {
  return (
    <tr>
      <td><FaPlay onClick={() => onPlay(game)} /></td>
      <td>{game.title}</td>
      <td>{game.created_at.substr(0,9)}</td>
      <td>{game.updated_at.substr(0,9)}</td>
    </tr>
  )
}

export default PlayGamesRow;