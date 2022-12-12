let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let indexController = require('../controllers/index');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}




/* GET home page. */
router.get('/',indexController.displayHomePage);

router.get('/home',indexController.displayHomePage);

router.get('/register',indexController.displayRegisterPage);
router.post('/register',indexController.processRegisterPage);

router.get('/login',indexController.displayLoginPage);
router.post('/login',indexController.processLoginPage);

router.get('/logout',indexController.performLogout);



module.exports = router;
