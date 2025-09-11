const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const {userRegister,userLogin,getAllMovies,getAllGenres,getMoviesByGenre,getMovieById,rateMovie,searchMovies} = authController;

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/viewAllMovies',getAllMovies);
router.get('/viewAllGenre',getAllGenres);
router.get('/movies/:genre',getMoviesByGenre);
router.get('/viewMovie/:id',getMovieById);
router.post('/rating',rateMovie);
router.get('/search',searchMovies);

module.exports = router;