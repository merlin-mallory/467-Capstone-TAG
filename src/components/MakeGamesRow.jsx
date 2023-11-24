import React from 'react';
import { FaPlay, FaTrash, FaEdit } from 'react-icons/fa';

function MakeGamesRow({game, onPlay, onEdit, onDelete}) {
  return (
    <tr>
      <td><FaPlay onClick={() => onPlay(game)} /></td>
      <td>{game.title} (#{game.game_id})</td>
      <td>{game.created_at.substr(0,9)}</td>
      <td>{game.updated_at.substr(0,9)}</td>
      <td><FaEdit onClick={() => onEdit(game)} /></td>
      <td><FaTrash onClick={() => onDelete(game._id)} /></td>
    </tr>
  )
}

export default MakeGamesRow;