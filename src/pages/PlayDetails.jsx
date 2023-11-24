
import React from 'react';
import { Link } from 'react-router-dom';

const PlayDetails = () => {
  return (
    <div>
      <div className="details-stats">
        <h1>Lincoln's Logs (#8)</h1>
        <table>
            <tbody>
                <tr>
                    <td>Created:</td>
                    <td>2023-10-31</td>
                </tr>
                <tr>
                    <td>Modified:</td>
                    <td>2023.10.31</td>
                </tr>
            </tbody>
        </table>
      </div>

      <br />

      <div className="details-description">
        Journey back in time and join forces with some of the nation's most iconic historical figures.
        A darkness lurks in the Appalachian mountains. Will you swing axes with Lincoln, sling lightning with Franklin,
        or box with Roosevelt to defeat the mysterious threat?
      </div>
      
      <br />

      <div className="buttons">
        <button><Link to="/play-games">Back to Play Games</Link></button>  
        <button><Link to="/play-game">Play</Link></button>
      </div>
    </div>
  );
};

export default PlayDetails;
