import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const gameSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    subject: {
        type: String,
    },
    author_name: {
        type: String, 
        required: false
    },
    author_id: {
        type: String,
        required: false
    },
    is_published: {
        type: Boolean,
        required: false,
        default: false
    },
    version: {
        type: Number,
        required: false,
        default: 1.0
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    description: {
        type: String,
        required: false,
        default: 'No description provided - This is a brief description of the game.'
    },
    game: {
        type: Object,
        required: false,
        default: {
            "player": {
                "name": "Player",
                "inventory": [],
                "choices": [],
                "location": ''
            },
            "rooms": [
                {
                    "name": "Room 1",
                    "description": "None provided - This is a description of the room.",
                    "first_visit": "This is a description that is displayed the first time the player enters the room.",
                    "items": [],
                    "exits": [],
                }
            ]
        }

    },
    game_id: {
        type: Number,
        required: true,
        unique: true
    },
});

const Game = model('Game', gameSchema);

// Create the index for the game_id field
Game.createIndexes()

export default Game;