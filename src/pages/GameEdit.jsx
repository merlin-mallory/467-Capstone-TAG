import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function GameEdit() {
   const { gameId } = useParams();
   const navigate = useNavigate();
   const [game, setGame] = useState(null);
   const user = JSON.parse(localStorage.getItem('user'));

   useEffect(() => {
      const fetchGame = async () => {
         try {
            const response = await fetch(`https://467-capstone-tag-production.up.railway.app/games/details/${gameId}`);
            const data = await response.json();
            setGame(data);
            console.log("Heres editgames data:", data);
            localStorage.setItem('game', JSON.stringify(data))
         } catch (error) {
            console.error('Error fetching game edit data...', error);
         }
      };

      fetchGame();
   }, [gameId])

   const handleRoomClick = (roomIndex) => {
      navigate(`/edit-game/${gameId}/${roomIndex}`);
   };

   const handleGameDescriptionChange = (e) => {
      setGame({ ...game, description: e.target.value });
   };   
   

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!user) {
         alert('You must be logged in to edit a game.');
         return;
      }
      try {
         const response = await fetch(`https://467-capstone-tag-production.up.railway.app/games/${gameId}`, {
           method: 'PUT', 
           body: JSON.stringify(game),
           headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
           throw new Error('Failed to update data in the database');
        }
        console.log('Data successfully updated in the database');
      } catch (error) {
        console.error(error.message);
      }
   };

   const renderRoomButtons = () => {
      if (!game || !game.game || !game.game.rooms) return null;

      return game.game.rooms.map((room, index) => (
         <button key={index} onClick={() => handleRoomClick(index)}>
            {room.name || `Room ${index + 1}`}
         </button>
      ));
   };

   const addRoom = () => {
      const newRoom = {
         name: 'New Room',
         description: 'None provided - This is a description of the room.',
         first_visit: 'This is a description that is displayed the first time the player enters the room.',
         Items: '',
         Exits: ''
      };
      setGame(prevGame => ({
          ...prevGame,
          game: {
              ...prevGame.game,
              rooms: [...prevGame.game.rooms, newRoom]
          }
      }));
  };
   

   return (
      <div className="yourgames-container">
         <div className="room-map">
            {renderRoomButtons()}
         </div>
         <br />
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="gameDescription" style={{ color: 'white' }}>Edit Game Description:</label>
               <br />
               <textarea
                  id="gameDescription"
                  rows="4"
                  value={game?.description || ''}
                  onChange={handleGameDescriptionChange}
               />
            </div>
            <button type="submit">Save Game</button>
         </form>
         <button onClick={addRoom}>Add Room</button>
         <button onClick={() => navigate("/make-games")}>Back to Make Games</button>
      </div>
   );
}

export default GameEdit;
