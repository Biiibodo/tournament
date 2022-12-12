const { Router } = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const tournment = require('../models/tournment');
let Tournment = require('../models/tournment');
let tournmentController = require('../controllers/tournment');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

router.get('/',tournmentController.displayTournment);
router.get('/add',requireAuth,tournmentController.displayAddPage);
//Router Post for add page
router.post('/add',requireAuth,tournmentController.processAddPage);
// Get For 8 Player
router.get('/8Player',requireAuth,tournmentController.display8Player);
//POST for 8player
router.post('/8Player/',requireAuth,tournmentController.process8Player);
// GET for 16 player
router.get('/16Player',requireAuth,tournmentController.display16Player);
router.post('/16Player',requireAuth,tournmentController.process16Player);
//router.get for faceoff Pre
router.get('/faceoffPre',requireAuth,tournmentController.displayfaceoffPre);
router.post('/faceoffPre',requireAuth,tournmentController.processfaceoffPre);
// GET for faceoff
router.get('/faceoff',requireAuth,tournmentController.displayfaceoff);
//POST for Faceoff
router.post('/faceoff',requireAuth,tournmentController.processfaceoff);
//Get for faceoff Semi Finals 
router.get('/faceoffSF',requireAuth,tournmentController.displaySF);
//Post for faceoff Semi Finals 
router.post('/faceoffSF',requireAuth,tournmentController.processSF);
//Get for faceoff Finals 
router.get('/faceoffFinals',requireAuth,tournmentController.displayFinals);
//Post for faceoff Finals
router.post('/faceoffFinals',requireAuth,tournmentController.processFinals);
router.get('/TheWinner',requireAuth,tournmentController.displayTheWinner);
router.post('/TheWinner',requireAuth,tournmentController.processTheWinner);

router.get('/delete/:id',requireAuth,tournmentController.performDelete);

module.exports = router;