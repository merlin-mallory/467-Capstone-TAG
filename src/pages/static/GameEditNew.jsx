import React from 'react';
import { Link } from 'react-router-dom';

function GameEditNew() {
    return (
        <div>
           <form>
                <h1>New Game #682</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="select-room">Select Room</label>
                            </td>
                            <td>
                                <select id="select-room" defaultValue="0">
                                    <option value="0">0 - Introduction</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="room-name">Room Name</label>
                            </td>
                            <td>
                                <input type="text" id="room-name" defaultValue="Introduction" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="room-text">Room Text</label>
                            </td>
                            <td>
                                <textarea id="room-text" rows="8" defaultValue=""></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <br />

            <div className="editor-choices-container">
                <h2>Room Choices</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Room Name</th>
                            <th>Room Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button>Add a New Room</button>
                    <button>Add an Existing Room</button>
                </div>
            </div>

            <br />

            <div className="editor-buttons">
                <div>
                    <button>Previous Room</button>
                    <button>Reset Room</button>
                    <button>Save Room</button>
                </div>

                <br />
                
                <div>
                    <button><Link to="/make-games">Back to Your Games</Link></button>
                </div>
            </div>
        </div>
    );
}

export default GameEditNew;
