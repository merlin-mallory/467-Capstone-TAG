import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


function GameEdit() {
   const { gameId } = useParams();
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
         rooms: Array.isArray(prevGame.rooms) ? [...prevGame.rooms, newRoom] : [newRoom]
      }));
   };

   const handleFieldChange = (roomIndex, field, value) => {
      setGame(prevGame => {
         const updatedRooms = [...prevGame.rooms];
         updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], [field]: value };
         return { ...prevGame, rooms: updatedRooms };
      });
   };

   const clearField = (roomIndex, field) => {
      setGame((prevGame) => {
         const updatedGame = [...prevGame];
         updatedGame[roomIndex] = {
            ...updatedGame[roomIndex],
            [field]: '',
         };
         return updatedGame;
      });
   };

   const deleteRoom = (roomIndex) => {
      setGame(prevGame => ({
          ...prevGame,
          rooms: prevGame.rooms.filter((_, index) => index !== roomIndex)
      }));
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

   
   const renderForm = () => {
      console.log('Game state:', game);
      if (!game || !game.game || !game.game.rooms) return null;

      return game.game.rooms.map((room, roomIndex) => (
         <div key={roomIndex}>
            <h3>Room {roomIndex + 1}</h3>
            {Object.keys(room).map((field) => (
               <div key={`${roomIndex}-${field}`}>
                  <label htmlFor={`${roomIndex}-${field}`}>{field}</label>
                  {(field === 'description' || field === 'first_visit') ? (
                     <textarea
                        rows="4" cols="50"
                        id={`${roomIndex}-${field}`}
                        value={room[field]}
                        onChange={(e) => handleFieldChange(roomIndex, field, e.target.value)}
                     />
                  ) : (
                     <input
                        type="text"
                        id={`${roomIndex}-${field}`}
                        value={room[field]}
                        onChange={(e) => handleFieldChange(roomIndex, field, e.target.value)}
                     />
                  )}
                  <button type="button" onClick={() => clearField(roomIndex, field)}>
                     Clear
                  </button>
               </div>
            ))}
            <button type="button" onClick={() => deleteRoom(roomIndex)}>
               Delete Room
            </button>
         </div>
      ));
   };

    return (
      <div className="yourgames-container">
         <form onSubmit={handleSubmit}>
            {renderForm()}
            <button type="button" onClick={addRoom}>
               Add Room
            </button>
            <button type="submit">
               Save
            </button>
         </form>
      </div>
   );
}

export default GameEdit;