import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GamesTable from './MakeGamesTable';

function MakeGamesList({ user, setGameToEdit, setGameToPlay }) {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const getMyGames = async () => {
        const response = await fetch(`https://467-capstone-tag-production-bd6a.up.railway.app/games?author_id=${user.uid}`);
        const data = await response.json();
        setGames(data);
    }

    useEffect(() => {
        getMyGames();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(`https://467-capstone-tag-production-bd6a.up.railway.app/games/${_id}`, {
            method: 'DELETE',
        });

        if (response.status === 200) {
            alert('Game deleted successfully!');
            const newGames = games.filter((game) => game._id !== _id);
            setGames(newGames);
        }
        else {
            alert(`Failed to delete game with id ${_id}. Status code = ${response.status}`);
        }
    }

    const onEdit = (game) => {
        navigate(`/edit-game/${game.game_id}`);
    }
    
    // Clicking on any given row's play button will route to that game's details page
    const onPlay = (game) => {
        navigate(`/games/details/${game.game_id}`);
    }

    return (
        <>
            <GamesTable games={games} onDelete={onDelete} onEdit={onEdit} onPlay={onPlay} />
        </>
    )
}

export default MakeGamesList;