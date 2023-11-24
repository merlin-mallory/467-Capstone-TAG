
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PlayDetails = () => {
  const { gameId } = useParams(); // Extract gameId from URL
  const [gameDetails, setGameDetails] = useState(null); // State to store game details

  useEffect(() => {
    // Fetch game details based on gameId
    fetchGameDetails(gameId).then(details => {
      setGameDetails(details);
    });
  }, [gameId]);

  async function fetchGameDetails(id) {
    try {
      const response = await fetch(`/games/details/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Assuming the response JSON directly contains the game details
    } catch (error) {
      console.error('Fetching game details failed:', error);
    }
  }

  if (!gameDetails) {
    return <div>Loading game details...</div>; // Loading state
  }

  const handlePlayThisGameClick = () => {
    alert("Not implemented yet...")
  }

  return (
    <div>
      <div className="details-stats">
        <h1>{gameDetails.title} (#{gameDetails.game_id})</h1>
        <table>
          <tbody>
            <tr>
              <td>Created:</td>
              <td>{gameDetails.created_at.substr(0,9)}</td>
            </tr>
            <tr>
              <td>Modified:</td>
              <td>{gameDetails.updated_at.substr(0,9)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />

      <div className="details-description">
        {gameDetails.description}
      </div>
      
      <br />

      <div className="buttons">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/make-games">Back to Make Games</Link></button>
        <button><Link to="/play-games">Back to Play Games</Link></button>  
        <button onClick={handlePlayThisGameClick}>Play This Game</button>
      </div>
    </div>
  );
};

export default PlayDetails;


//       <div className="details-description">
//         Journey back in time and join forces with some of the nation's most iconic historical figures.
//         A darkness lurks in the Appalachian mountains. Will you swing axes with Lincoln, sling lightning with Franklin,
//         or box with Roosevelt to defeat the mysterious threat?
//       </div>