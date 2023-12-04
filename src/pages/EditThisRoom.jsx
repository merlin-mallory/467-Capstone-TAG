import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditThisRoom() {
    const { gameId, roomIndex } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`https://467-capstone-tag-production-bd6a.up.railway.app/games/details/${gameId}`);
                const data = await response.json();
                setGame(data);
            } catch (error) {
                console.error('Error fetching room data...', error);
            }
        };

        fetchGame();
    }, [gameId, roomIndex]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to edit a game.');
            return;
        }
    
        const updatedGame = { ...game };
    
        const updateResponse = await fetch(`https://467-capstone-tag-production-bd6a.up.railway.app/${gameId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedGame),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!updateResponse.ok) {
            throw new Error('Failed to update data in the database');
        }
        console.log('Game successfully updated in the database');
    };
    


    const handleInputChange = (field, value) => {
        setGame(prevGame => {
            const updatedRooms = [...prevGame.game.rooms];
            updatedRooms[roomIndex] = {...updatedRooms[roomIndex], [field]: value};
            return {...prevGame, game: {...prevGame.game, rooms: updatedRooms}};
        });
    };

    if (!game) return <div>Loading...</div>;

    const currentRoom = game.game.rooms[roomIndex];

    return (
        <div>
            <h2>Edit Room: {currentRoom.name}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={currentRoom.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        value={currentRoom.description} 
                        onChange={(e) => handleInputChange('description', e.target.value)} 
                    />
                </div>
                <div>
                    <label>First Visit:</label>
                    <textarea 
                        value={currentRoom.first_visit} 
                        onChange={(e) => handleInputChange('first_visit', e.target.value)} 
                    />
                </div>
                <div>
                    <label>Items:</label>
                    <input 
                        type="text" 
                        value={currentRoom.Items} 
                        onChange={(e) => handleInputChange('Items', e.target.value)} 
                    />
                </div>
                <div>
                    <label>Exits:</label>
                    <input 
                        type="text" 
                        value={currentRoom.Exits} 
                        onChange={(e) => handleInputChange('Exits', e.target.value)} 
                    />
                </div>
                
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => navigate(`/edit-game/${gameId}`)}>Back to Game Edit</button>
        </div>
    );
}

export default EditThisRoom;
