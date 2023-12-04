import React from 'react';
import MakeGameRow from './MakeGamesRow';

function MakeGamesTable({ games, onPlay, onEdit, onDelete }) {
    return (
    <div className="table-container1">
        <table id='games-table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Date Created</th>
                    <th>Date Modified</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {games.map(game => <MakeGameRow key={game._id} game={game} onPlay={onPlay} onEdit={onEdit} onDelete={onDelete} />)}
            </tbody>
        </table>
    </div>
    )
}

export default MakeGamesTable;
