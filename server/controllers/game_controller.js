import Game from '../models/game_model.js';
import sitewidevarsModel from '../models/sitewidevars_model.js';
import ApiUtils from '../utils/api_utils.js';
import { asyncErrorHandler } from '../utils/async_error_handler.js';

const createGame = asyncErrorHandler(async (req, res, next) => {
    const game = await Game.create(req.body);
    return res.status(201).json(game);
});

const findGames = asyncErrorHandler(async (req, res, next) => {
    const apiUtils = new ApiUtils(Game.find(), req.query)
        .filter();
    let games = await apiUtils.query;
    return res.status(200).json(games);
});

const findGameById = asyncErrorHandler(async (req, res, next) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
        return next(new Error('Game not found!'));
    }

    return res.status(200).json(game);

});

const updateGameById = asyncErrorHandler(async (req, res, next) => {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedGame) {
        return next(new Error('Game not found!'));
    }

    return res.status(200).json(updatedGame);
});

const deleteGameById = asyncErrorHandler(async (req, res, next) => {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);

    if (!deletedGame) {
        return next(new Error('Game not found!'));
    }

    return res.status(200).json(deletedGame);
});

const getAllPublishedGames = asyncErrorHandler(async (req, res, next) => {
    req.query.is_published = true;
    next();
});

const getCurrentMaxGameId = asyncErrorHandler(async (req, res, next) => {
    try {
        // There is only one document in the sitewidevars collection, so we can use findOne() without a query.
        const sitewidevars = await sitewidevarsModel.findOne();
        if (!sitewidevars) {
            return res.status(404).json({ message: 'sitewidevars not found' });
        }
        return res.status(200).json({ currentMaxGameId: sitewidevars.currentMaxGameId });
    } catch (error) {
        return next(error);
    }
});

const updateCurrentMaxGameId = asyncErrorHandler(async (req, res, next) => {

    console.log(res.body);
    const { currentMaxGameId } = req.body;

    // Get the sitewidevars collection from the DB
    const sitewidevars = await sitewidevarsModel.findOne();
    console.log('this is what we got from the db:', sitewidevars);

    // Update the currentMaxGameId in the DB
    sitewidevars.currentMaxGameId = currentMaxGameId;
    await sitewidevars.save();

    console.log('this is what we saved to the db:', sitewidevars);

    // Return the currentMaxGameId in the response, so they can check for success.

    return res.status(200).json({ currentMaxGameId: sitewidevars.currentMaxGameId });
});

const findGameDetails = asyncErrorHandler(async (req, res, next) => {
    const game = await Game.findOne({ game_id: req.params.gameId });

    if (!game) {
        return next(new Error('Game not found!'));
    }

    return res.status(200).json(game);
});




export { createGame, findGames, findGameById, updateGameById, deleteGameById, getAllPublishedGames, getCurrentMaxGameId, updateCurrentMaxGameId, findGameDetails };