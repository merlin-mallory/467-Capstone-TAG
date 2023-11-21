import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


function GameEdit() {
    const gameId = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const initGame = JSON.parse(localStorage.getItem('game'));
   const [game, setGame] = useState(initGame.game.rooms);

   const handleFieldChange = (roomIndex, field, value) => {
      setGame((prevGame) => {
         const updatedGame = [...prevGame];
         updatedGame[roomIndex] = {
            ...updatedGame[roomIndex],
            [field]: value,
         };
         return updatedGame;
      });
   };

   const addRoom = () => {
      const newRoom = {
         name: 'New Room',
         description: 'None provided - This is a description of the room.',
         first_visit: 'This is a description that is displayed the first time the player enters the room.',
         Items: '',
         Exits: ''
      };
      setGame((prevGame) => [...prevGame, newRoom]);
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
      setGame((prevGame) => prevGame.filter((_, index) => index !== roomIndex));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();


      try {
        const response = await fetch(`/games/${gameId.gameId}`, {
           method: 'PUT', 
           body: JSON.stringify({ game: { rooms: game } }),
        });

        if (!response.ok) {
           throw new Error('Failed to update data in the database');
        }

        console.log('Data successfully updated in the database');
     } catch (error) {
        console.error(error.message);
     }


      if (!user) {
        alert('You must be logged in to create a new game.');
        return;
      }

      localStorage.setItem('game', JSON.stringify({ game: { rooms: game } }));
   };

   
   const renderForm = () => {
      return game.map((room, roomIndex) => (
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