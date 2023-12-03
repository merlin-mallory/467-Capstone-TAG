
import React from 'react';
import { FaPlay, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MakeGames() {
  return (
    <div className="yourgames-container">
      <h1>Your Games</h1>
      <Table />
      <Buttons />
    </div>
  )
}

function Table() {
  return(
    <div>
      <br></br>
      <br></br>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>GameTitle (GameId)</th>
            <th>CreateDate</th>
            <th>ModDate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Link to="/play-game"><FaPlay /></Link></td>
            <td>Lincoln's Logs (#8)</td>
            <td>2022-01-01</td>
            <td>2022-01-02</td>
            <td><FaTrash /></td>
          </tr>
          <tr>
            <td><FaPlay /></td>
            <td>Geometric Journeys (#8000)</td>
            <td>2022-01-03</td>
            <td>2022-01-04</td>
            <td><FaTrash /></td>
          </tr>
          <tr>
            <td><FaPlay /></td>
            <td>The Quest for the Lost Variable (#29)</td>
            <td>2022-01-05</td>
            <td>2022-01-06</td>
            <td><FaTrash /></td>
          </tr>
          <tr>
            <td><FaPlay /></td>
            <td><Link to="/game-edit602">New Horizons (#682)</Link></td>
            <td>2022-01-05</td>
            <td>2022-01-06</td>
            <td><FaTrash /></td>
          </tr>
          <tr>
            <td></td>
            <td>...</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Buttons() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button><Link to="/">Home</Link></button>
      <button><Link to="/create-new-game">Create Game</Link></button>
    </div>
  );
}

export default MakeGames;
