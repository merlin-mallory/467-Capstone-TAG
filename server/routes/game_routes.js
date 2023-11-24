import express from 'express';
import * as games from '../controllers/game_controller.js';

const router = express.Router();

router.route('/currentMaxGameId')
    .get(games.getCurrentMaxGameId)
    .patch(games.updateCurrentMaxGameId);

router.route('/published')
    .get(games.getAllPublishedGames, games.findGames);

router.route('/')
    .post(games.createGame)
    .get(games.findGames);

// New route for fetching game details for play games.
router.get('/details/:gameId', games.findGameDetails);

router.route('/:id')
    .get(games.findGameById)
    .patch(games.updateGameById)
    .delete(games.deleteGameById);

export default router;
