import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditGameForm({user, setGameToEdit}) {
    const [game, setGame] = useState([]);
    const navigate = useNavigate();


    const getMyGame = async () => {
        const response = await fetch (`/games?_id=${setGameToEdit._id}`);
        const data = await response.json();
        setGame(data);
    }


}


export default EditGameForm;