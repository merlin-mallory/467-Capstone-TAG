import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditThisRoom() {
    const { gameId, roomIndex } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [playerChoices, setPlayerChoices] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`https://467-capstone-tag-production-bd6a.up.railway.app/games/details/${gameId}`);
                const data = await response.json();
                setGame(data);

                if (data && data.game && data.game.rooms && data.game.rooms[roomIndex]) {
                    const existingChoices = data.game.rooms[roomIndex].exits.map(exit => {
                        return [exit[0] || '', parseInt(exit[1]) || 0];
                    });
                    setPlayerChoices(existingChoices);
                }
            } catch (error) {
                console.error('Error fetching room data...', error);
            }
        };

        fetchGame();
    }, [gameId, roomIndex]);

    const addPlayerChoice = () => {
        setPlayerChoices([...playerChoices, ['', 0]]);
    };

    const handlePlayerChoiceChange = (index, field, value) => {
        const updatedChoices = [...playerChoices];
        updatedChoices[index] = field === 'promptText' ? [value, updatedChoices[index][1]] : [updatedChoices[index][0], parseInt(value)];
        setPlayerChoices(updatedChoices);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to edit a game.');
            return;
        }

        const updatedRoom = {
            ...game.game.rooms[roomIndex],
            name: game.game.rooms[roomIndex].name,
            description: game.game.rooms[roomIndex].description,
            exits: playerChoices
        };

        const updatedGame = { ...game };
        updatedGame.game.rooms[roomIndex] = updatedRoom;

        const updateResponse = await fetch(`https://467-capstone-tag-production-bd6a.up.railway.app/games/${game._id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedGame),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update data in the database');
        }
        console.log('Game successfully updated in the database');
    };

    const handleInputChange = (field, value) => {
        const updatedRooms = [...game.game.rooms];
        updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], [field]: value };
        setGame({ ...game, game: { ...game.game, rooms: updatedRooms } });
    };

    if (!game) return <div>Loading...</div>;

    const currentRoom = game.game.rooms[roomIndex];

    return (
        <div>
            <h2>Edit Room: {currentRoom.name}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={currentRoom.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={currentRoom.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                </div>
                <div>
                    <label>Player Choices:</label>
                    <button type="button" onClick={addPlayerChoice}>Add Player Choice</button>
                    {playerChoices.length === 0 ? (
                        <p>No player choices added yet...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Prompt Text</th>
                                    <th>Room Link</th>
                                    <th>Link Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playerChoices.map((choice, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="text" value={choice[0]} onChange={(e) => handlePlayerChoiceChange(index, 'promptText', e.target.value)} />
                                        </td>
                                        <td>
                                            <select value={choice[1]} onChange={(e) => handlePlayerChoiceChange(index, 'roomLink', e.target.value)}>
                                                {game.game.rooms.map((room, idx) => (
                                                    <option key={idx} value={idx}>{idx}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            {game.game.rooms[choice[1]]?.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => navigate(`/edit-game/${gameId}`)}>Back to Game Edit</button>
        </div>
    );
}

export default EditThisRoom;
