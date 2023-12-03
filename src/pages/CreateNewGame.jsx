import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateNewGame() {
  const [newGameName, setNewGameName] = useState('');
  const [newGameDescription, setNewGameDescription] = useState('');
  const [newGameIsPublished, setNewGameIsPublished] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const checkHandler = () => {
    setNewGameIsPublished(!newGameIsPublished);
  }

  const allocateGameId = async () => {
    try {
      // Get the current max game ID
      const currentIdResponse = await fetch('https://467-capstone-tag-production.up.railway.app/games/currentMaxGameId');
      if (!currentIdResponse.ok) {
        throw new Error('Failed to fetch currentMaxGameId');
      }
      const currentIdData = await currentIdResponse.json();
      // console.log("currentIdData.currentMaxGameId:", currentIdData.currentMaxGameId);
      let currentMaxGameId = currentIdData.currentMaxGameId;
  
      // Increment the current max game ID
      currentMaxGameId += 1;
      // console.log("Heres the currentMaxGameId:", currentMaxGameId);
  
      // Update the current max game ID
      const patchResponse = await fetch('https://467-capstone-tag-production.up.railway.app/games/currentMaxGameId', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentMaxGameId }),
      });

      if (!patchResponse.ok) {
        throw new Error('Failed to patch currentMaxGameId');
      }
  
      const updatedIdData = await patchResponse.json();
      // console.log("updatedIdData.currentMaxGameId:", updatedIdData.currentMaxGameId);
      return updatedIdData.currentMaxGameId;

    } catch (error) {
        console.error("Error in allocating game ID:", error);
      return null;
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!user) {
      alert('You must be logged in to create a new game.');
      return;
    }
  
    // Allocate a new game ID
    const newGameId = await allocateGameId();
    if (newGameId === null) {
      alert('Failed to allocate a new game ID.');
      return;
    }
  
    const newGame = {
      title: newGameName,
      description: newGameDescription,
      author_id: user.uid,
      author_name: user.email,
      is_published: newGameIsPublished,
      game_id: newGameId
    };
  
    // Making the POST request to create a new game
    const response = await fetch('https://467-capstone-tag-production.up.railway.app/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame),
    });
  
    if (response.status === 201) {
      alert('Game created successfully!');
      const data = await response.json();
      // Redirect to the game edit page or wherever needed
      navigate(`/make-games`); // Uncomment and modify as needed
    } else {
      alert(`Failed to create game. Status code = ${response.status}`);
    }
  };
  


  return (
    <div>
      <h1>Create a New Game</h1>
      <br></br>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="new-game-name">New Game Name:</label>
              </td>
              <td>
                <input type="text" id="new-game-name" name="new-game-name" className="createNewGame-name" required maxLength="100"
                  value={newGameName} onChange={(event) => setNewGameName(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="new-game-description">New Game Description:</label>
              </td>
              <td>
                <textarea id="new-game-description" name="new-game-description" className="createNewGame-description" required maxLength="500"
                  value={newGameDescription} onChange={(event) => setNewGameDescription(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="is_published">Publish Game?</label>
              </td>
              <td>
                <input type="checkbox" id="is_published" name="is_published" className="createNewGame-isPublished"
                  checked={newGameIsPublished} onChange={checkHandler}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button><Link to="/make-games">Back to Your Games</Link></button>
                <button onClick={handleSubmit}>Create Game</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CreateNewGame;
