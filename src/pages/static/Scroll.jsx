
import React from 'react';
import { Link } from 'react-router-dom';

const PlayGames = () => {
  return (
    <div>
      <div className="PlayGames-img-container">
        <h1>Play Games</h1>
      </div>
      <div className="PlayGames-table-container">
        <table>
          <thead>
            <tr>
              <th>Game Title</th>
              <th>Created</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><Link to="/play-details">Lincoln's Logs (#8)</Link></td>
                <td>2022-01-01</td>
                <td>2022-01-02</td>
            </tr>
            <tr>
                <td>Geometric Journeys (#8000)</td>
                <td>2022-01-03</td>
                <td>2022-01-04</td>
            </tr>
            <tr>
                <td>The Quest for the Lost Variable (#29)</td>
                <td>2022-01-05</td>
                <td>2022-01-06</td>
            </tr>
            <tr>
                <td>New Horizons (#682)</td>
                <td>2022-01-05</td>
                <td>2022-01-06</td>
            </tr>
            <tr>
                <td>Fire Rescue (#81)</td>
                <td>2022-01-05</td>
                <td>2022-01-06</td>
            </tr>
            <tr>
                <td>Dodgeball Demons (#2)</td>
                <td>2022-01-05</td>
                <td>2022-01-06</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button><Link to="/">Home</Link></button>
      </div>
    </div>
  );
};

export default PlayGames;
