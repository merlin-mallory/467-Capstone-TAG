import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PlayGamesTable from './PlayGamesTable';

function PlayGamesList({setGameToPlay }) {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const getPublishedGames = async () => {
        const response = await fetch(`/games?is_published=true`);
        const data = await response.json();
        setGames(data);
    }

    useEffect(() => {
        getPublishedGames();
    }, []);

    //Not working yet - a dynamic version of that page must be implemented first
    const onPlay = async (_id) => {
        setGameToPlay(_id);
        navigate('/play-details');
    }

    return (
        <>
            <PlayGamesTable games={games} onPlay={onPlay} />
        </>
    )
}

export default PlayGamesList;