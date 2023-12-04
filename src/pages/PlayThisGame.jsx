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

  const handleExitClick = (nextRoomIndex) => {
    navigate(`/play-game/${gameId}/${nextRoomIndex}`);
  };

  return (
    <div>
      <h1>{game.title} (#{game.game_id})</h1>
      <p>Room #{roomIndex}</p>
      <p>{currentRoom.name}</p>
      <p>{currentRoom.description}</p>
      <br />
      <div>
        {currentRoom.exits.length > 0 ? (
          currentRoom.exits.map((exit, index) => (
            <React.Fragment key={index}>
              <button onClick={() => handleExitClick(exit[1])}>
                {exit[0]}
              </button>
              <br />
            </React.Fragment>
          ))
        ) : (
          <p>No player choices currently available...</p>
        )}
      </div>
      <br />
      <button onClick={() => navigate(`/`)}>Home</button>
      <button onClick={() => navigate(`/make-games`)}>Make Games</button>
      <button onClick={() => navigate(`/play-games`)}>Play Games</button>
      <button onClick={() => navigate(`/games/details/${gameId}`)}>Game Details</button>
    </div>
  );
}

export default PlayThisGame;
