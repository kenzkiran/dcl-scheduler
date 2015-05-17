var dclConstants = require('./dcl-constants.js');
var Ground = require('./Ground.js');
var Team = require('./Team.js');
var Divisions = require('./Divisions.js');
var _ = require('underscore');
var DIV_TYPES = dclConstants.DIV_TYPES;
var LEAGUE_TYPES = dclConstants.LEAGUE_TYPES;


var TEAMS_DIV_A = [
    // Div A Teams
    new Team('Anderson', DIV_TYPES.DIV_A, LEAGUE_TYPES.TAPE),
    new Team('Bradman', DIV_TYPES.DIV_A, LEAGUE_TYPES.TAPE),
    new Team('Crains', DIV_TYPES.DIV_A, LEAGUE_TYPES.TAPE),
    new Team('Dravid', DIV_TYPES.DIV_A, LEAGUE_TYPES.TAPE),
    new Team('Eoin', DIV_TYPES.DIV_A, LEAGUE_TYPES.TAPE),
    new Team('Faulkner', DIV_TYPES.DIV_A, LEAGUE_TYPES.TAPE)
]

var TEAMS_DIV_B = [
    // Div B Teams
    new Team('Arya', DIV_TYPES.DIV_B, LEAGUE_TYPES.TAPE),
    new Team('Bhaskar', DIV_TYPES.DIV_B, LEAGUE_TYPES.TAPE),
    new Team('Cheluva', DIV_TYPES.DIV_B, LEAGUE_TYPES.TAPE),
    new Team('Dumya', DIV_TYPES.DIV_B, LEAGUE_TYPES.TAPE),
    new Team('Ekalavya', DIV_TYPES.DIV_B, LEAGUE_TYPES.TAPE)
];


var GROUNDS = {
    bangalore: new Ground("Bengaluru", {slots: 1, max: 2}),
    chennai:  new Ground("Chennai", {slots: 2, max: -1}),
    mysore:  new Ground("Mysore", {slots: 3, max: -1}),
    dallas:  new Ground("Dallas", {slots: 4, max: 4}),
};

// for testing
GROUNDS.bangalore.setAvailability('sun', false);
GROUNDS.mysore.setAvailability('sat', false);
GROUNDS.chennai.setAvailability('fri');


var DIVISIONS = {
    DIV_A: {teams: _.clone(TEAMS_DIV_A), umpires: 'DIV_B', grounds: [_.clone(GROUNDS.bangalore), _.clone(GROUNDS.chennai), _.clone(GROUNDS.mysore)]},
    DIV_B: {teams: _.clone(TEAMS_DIV_B), umpires: 'DIV_A', grounds: [_.clone(GROUNDS.bangalore), _.clone(GROUNDS.chennai), _.clone(GROUNDS.dallas)]}
}


var config = {
    divisions: DIVISIONS,
    grounds: GROUNDS
}

module.exports = config;