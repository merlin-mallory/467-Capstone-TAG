import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GamesTable from './MakeGamesTable';

function MakeGamesList({ user, setGameToEdit, setGameToPlay }) {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const getMyGames = async () => {
        const response = await fetch(`/games?author_id=${user.uid}`);
        const data = await response.json();
        setGames(data);
    }

    useEffect(() => {
        getMyGames();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(`/games/${_id}`, {
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

    //Not working yet - a dynamic version of that page must be implemented first
    const onEdit = async (_id) => {
        setGameToEdit(_id);
        navigate('/edit-game');
    }
    //Not working yet - a dynamic version of that page must be implemented first
    const onPlay = async (_id) => {
        setGameToPlay(_id);
        navigate('/play-game');
    }

    return (
        <>
            <GamesTable games={games} onDelete={onDelete} onEdit={onEdit} onPlay={onPlay} />
        </>
    )
}

export default MakeGamesList;