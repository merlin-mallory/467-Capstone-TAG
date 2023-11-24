
import React from 'react';
import { Link } from 'react-router-dom';

const PlayGame = () => {
  return (
    <div>
      <div className="play-game-info">
        <table>
                <tbody>
                    <tr>
                        <td>Game Title:</td>
                        <td>Lincoln's Logs</td>
                    </tr>
                    <tr>
                        <td>Room Title:</td>
                        <td>Introduction</td>
                    </tr>
                </tbody>
            </table>
      </div>

      <div className="play-game-prompt">
        <p>There is a fork in the road ahead. Which way do you go?</p>
        <div>
          <button>Go left</button> <br />
          <button>Go right</button>
        </div>
      </div>

      <br />

      <div className="buttons">
        <button><Link to="/make-games">Your Games</Link></button>
        <button><Link to="/scroll">Play Games</Link></button>
        <button><Link to="/">Home</Link></button>
      </div>
    </div>
  );
};

export default PlayGame;
