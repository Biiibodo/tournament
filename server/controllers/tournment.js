let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
const tournment = require('../models/tournment');
let Tournment = require('../models/tournment');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayTournment = (req,res,next) => {
    Tournment.find((err,TournmentList) => {
        if(err){
            return console.error(err)
        }else{
            res.render('tournment/tournmentlist',{title: 'Tournment', TournmentList: TournmentList});
        };
    });
};

module.exports.displayAddPage = (req,res,next) =>{
    res.render('tournment/add',{title: 'Create Tournment'});
};

module.exports.processAddPage = (req,res,next) =>{
    req.session.name = req.body.name;
    req.session.description = req.body.description;
    let numPlayers = req.body.numPlayers;
    req.session.numPlayers = numPlayers;
    if (numPlayers == 8){
        res.redirect('8Player');
    }else{numPlayers == 16}{
        res.redirect('16Player');
    };
};

module.exports.display8Player = (req,res,next) =>{
    res.render('tournment/8Player',{title: "8 Player Tournment"});
}

module.exports.process8Player = (req,res,next) =>{
    req.session.player1 = req.body.player1;
    req.session.player2 = req.body.player2;
    req.session.player3 = req.body.player3;
    req.session.player4 = req.body.player4;
    req.session.player5 = req.body.player5;
    req.session.player6 = req.body.player6;
    req.session.player7 = req.body.player7;
    req.session.player8 = req.body.player8;

    req.session.Winner1 = req.session.player1;
    req.session.Winner2 = req.session.player2;
    req.session.Winner3 = req.session.player3;
    req.session.Winner4 = req.session.player4;
    req.session.Winner5 = req.session.player5;
    req.session.Winner6 = req.session.player6;
    req.session.Winner7 = req.session.player7;
    req.session.Winner8 = req.session.player8;
    res.redirect('faceoff');
};

module.exports.display16Player = (req,res,next) =>{
    res.render('tournment/16Player',{title: "16 Player Tournment"});
};

module.exports.process16Player = (req,res,next) =>{
    req.session.player1 = req.body.player1;
    req.session.player2 = req.body.player2;
    req.session.player3 = req.body.player3;
    req.session.player4 = req.body.player4;
    req.session.player5 = req.body.player5;
    req.session.player6 = req.body.player6;
    req.session.player7 = req.body.player7;
    req.session.player8 = req.body.player8;
    req.session.player9 = req.body.player9;
    req.session.player10 = req.body.player10;
    req.session.player11 = req.body.player11;
    req.session.player12 = req.body.player12;
    req.session.player13 = req.body.player13;
    req.session.player14 = req.body.player14;
    req.session.player15 = req.body.player15;
    req.session.player16 = req.body.player16;
    res.redirect('faceoffPre');
};

module.exports.displayfaceoffPre = (req,res,next) =>{
    res.render('tournment/faceoffPre',
    {title: "Face Off",
     player1: req.session.player1,
     player2: req.session.player2,
     player3: req.session.player3,
     player4: req.session.player4,
     player5: req.session.player5,
     player6: req.session.player6,
     player7: req.session.player7,
     player8: req.session.player8,
     player9: req.session.player9,
     player10: req.session.player10,
     player11: req.session.player11,
     player12: req.session.player12,
     player13: req.session.player13,
     player14: req.session.player14,
     player15: req.session.player15,
     player16: req.session.player16,
    });
};

module.exports.processfaceoffPre = (req,res,next) =>{
    req.session.Winner1 = req.body.Winner1;
    req.session.Winner2 = req.body.Winner2;
    req.session.Winner3 = req.body.Winner3;
    req.session.Winner4 = req.body.Winner4;
    req.session.Winner5 = req.body.Winner5;
    req.session.Winner6 = req.body.Winner6;
    req.session.Winner7 = req.body.Winner7;
    req.session.Winner8 = req.body.Winner8;
    res.redirect('faceoff');
};

module.exports.displayfaceoff = (req,res,next) =>{
    res.render('tournment/faceoff',
    {title: "Face Off",
     player1: req.session.Winner1,
     player2: req.session.Winner2,
     player3: req.session.Winner3,
     player4: req.session.Winner4,
     player5: req.session.Winner5,
     player6: req.session.Winner6,
     player7: req.session.Winner7,
     player8: req.session.Winner8,
    });
};

module.exports.processfaceoff = (req,res,next) =>{
    req.session.Winner1 = req.body.Winner1;
    req.session.Winner2 = req.body.Winner2;
    req.session.Winner3 = req.body.Winner3;
    req.session.Winner4 = req.body.Winner4;
    res.redirect('faceoffSF');
};

module.exports.displaySF = (req,res,next) =>{
    res.render('tournment/faceoffSF',
    {title: "Face Off Semi Finals",
    Winner1 : req.session.Winner1,
    Winner2 : req.session.Winner2,
    Winner3 : req.session.Winner3,
    Winner4 : req.session.Winner4,
    });
};

module.exports.processSF = (req,res,next) =>{
    req.session.SemiFinal1 = req.body.Winner1;
    req.session.SemiFinal2 = req.body.Winner2;
    res.redirect('faceoffFinals');
};

module.exports.displayFinals = (req,res,next) =>{
    res.render('tournment/faceoffFinals',{
    title: "The Finals",
    Winner1 : req.session.SemiFinal1,
    Winner2: req.session.SemiFinal2
    });
};

module.exports.processFinals = (req,res,next) =>{
    req.session.TheWinner = req.body.TheWinner;
    numPlayers = req.session.numPlayers;
    if (numPlayers == 8){
        let newTournment = Tournment({
            "name" : req.session.name,
            "description": req.session.description,
            "winner": req.session.TheWinner,
            "player1": req.session.player1,
            "player2": req.session.player2,
            "player3": req.session.player3,
            "player4": req.session.player4,
            "player5": req.session.player5,
            "player6": req.session.player6,
            "player7": req.session.player7,
            "player8": req.session.player8,
        });
        Tournment.create(newTournment,(err,Tournment) =>{
            if(err){
                console.log(err);
                res.end(err);
            }else{
                res.redirect('TheWinner');
            };
        });

    }else{
        let newTournment = Tournment({
            "name" : req.session.name,
            "description": req.session.description,
            "winner": req.session.TheWinner,
            "player1": req.session.player1,
            "player2": req.session.player2,
            "player3": req.session.player3,
            "player4": req.session.player4,
            "player5": req.session.player5,
            "player6": req.session.player6,
            "player7": req.session.player7,
            "player8": req.session.player8,
            "player9": req.session.player9,
            "player10": req.session.player10,
            "player11": req.session.player11,
            "player12": req.session.player12,
            "player13": req.session.player13,
            "player14": req.session.player14,
            "player15": req.session.player15,
            "player16": req.session.player16
        });
        Tournment.create(newTournment,(err,Tournment) =>{
            if(err){
                console.log(err);
                res.end(err);
            }else{
                res.redirect('TheWinner');
            };
        });
    }
};

module.exports.displayTheWinner = (req,res,next) =>{
    res.render('tournment/TheWinner',{
        title: "The Winner",
        nameOfComp: req.session.name,
        nameOfWinner: req.session.TheWinner
    });
};

module.exports.processTheWinner = (req,res,next) =>{
    res.redirect('/');
};

module.exports.performDelete = (req,res,next) =>{
    let id = req.params.id

    Tournment.remove({_id:id},(err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/tournentlist');
        };
    });
};



