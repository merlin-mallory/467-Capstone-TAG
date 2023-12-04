import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PlayThisGame() {
  const { gameId, roomIndex } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`https://467-capstone-tag-production-bd6a.up.railway.app/games/details/${gameId}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game data...', error);
      }
    };

    fetchGame();
  }, [gameId, roomIndex]);

  if (!game) return <div>Loading...</div>;

  const currentRoom = game.game.rooms[roomIndex];

  return (
    <div>
      <h1>{game.title} (#{game.game_id})</h1>
      <p>Room #{roomIndex}</p>
      <p>{currentRoom.name}</p>
      <p>{currentRoom.description}</p>
      <p>Exits: {currentRoom.Exits}</p>
      <button onClick={() => navigate(`/home`)}>Home</button>
      <button onClick={() => navigate(`/games/details/${gameId}`)}>Game Details</button>
      <button onClick={() => navigate(`/play-games`)}>Play Games</button>
      <button onClick={() => navigate(`/make-games`)}>Make Games</button>
      
    </div>
  );
}

export default PlayThisGame;
