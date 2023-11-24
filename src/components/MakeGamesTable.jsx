import React from 'react';
import GameRow from './MakeGamesRow';

function MakeGamesTable({ games, onPlay, onEdit, onDelete }) {
    return (
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
                {games.map(game => <GameRow key={game._id} game={game} onPlay={onPlay} onEdit={onEdit} onDelete={onDelete} />)}
            </tbody>
        </table>
    )
}

export default MakeGamesTable;
