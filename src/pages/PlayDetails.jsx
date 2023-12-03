
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';

const PlayDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    fetchGameDetails(gameId).then(details => {
      setGameDetails(details);
    });
  }, [gameId]);

  async function fetchGameDetails(id) {
    try {
      const response = await fetch(`https://467-capstone-tag-production.up.railway.app/games/details/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching game details failed:', error);
    }
  }

  if (!gameDetails) {
    return <div>Loading game details...</div>;
  }

  const handlePlayThisGameClick = () => {
    navigate(`play-game/${gameId}/0`);
  }

  // This gets the URL for the QR code
  const playDetailsUrl = `https://text-adventure-game-for-ed.web.app/games/details/${gameId}`;

  return (
    <div>
      <div className="details-stats">
        <h1>{gameDetails.title} (#{gameDetails.game_id})</h1>
        <br></br>
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
        <button><Link to="/">HomeBBB</Link></button>
        <button><Link to="/make-games">Make Games</Link></button>
        <button><Link to="/play-games">Play Games</Link></button>  
        <button><Link to={`/play-game/${gameId}/0`}>Play This Game</Link></button>
      </div>

      <br />

      <div className="qr-code">
        <h2>Scan to Play</h2>
        <QRCode value={playDetailsUrl} size={256} />
      </div>
    </div>
  );
};

export default PlayDetails;
