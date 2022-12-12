let mongoose = require('mongoose');

let tournmentModel = mongoose.Schema({
    name: String,
    description: String,
    winner: String,
    player1: String,
    player2: String,
    player3: String,
    player4: String,
    player5: String,
    player6: String,
    player7: String,
    player8: String,
    player9: String,
    player10: String,
    player11: String,
    player12: String,
    player13: String,
    player14: String,
    player15: String,
    player16: String
},
{
    collection:'tournments'
});

module.exports = mongoose.model('Tournment', tournmentModel);
