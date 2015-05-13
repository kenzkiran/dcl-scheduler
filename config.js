var LEAGUE_TYPES = { LEATHER: 'L', TAPE: 'T' }
var DIV_TYPES = { DIV_A: 'div_a', DIV_B: 'div_b'};

var TEAMS_DIV_A = [
    // Div A Teams
    { name: "Anderson", div: DIV_TYPES.DIV_A, type: LEAGUE_TYPES.TAPE },
    { name: "Bradman", div: DIV_TYPES.DIV_A, type: LEAGUE_TYPES.TAPE },
    { name: "Crains", div: DIV_TYPES.DIV_A, type: LEAGUE_TYPES.TAPE },
    { name: "Dravid", div: DIV_TYPES.DIV_A, type: LEAGUE_TYPES.TAPE },
    { name: "Eoin", div: DIV_TYPES.DIV_A, type: LEAGUE_TYPES.TAPE },
    { name: "Faulkner", div: DIV_TYPES.DIV_A, type: LEAGUE_TYPES.TAPE }
]

var TEAMS_DIV_B = [
    // Div B Teams
    { name: "Arya", div: DIV_TYPES.DIV_B, type: LEAGUE_TYPES.TAPE },
    { name: "Bhaskar", div: DIV_TYPES.DIV_B, type: LEAGUE_TYPES.TAPE },
    { name: "Cheluva", div: DIV_TYPES.DIV_B, type: LEAGUE_TYPES.TAPE },
    { name: "Dumya", div: DIV_TYPES.DIV_B, type: LEAGUE_TYPES.TAPE },
    { name: "Ekalavya", div: DIV_TYPES.DIV_B, type: LEAGUE_TYPES.TAPE }
];

/**
 * @slots {number} Number of slots per day (e.g)
 * @max {number} Max number of games that can be scheduled, -1 = UNLIMITED
 */
var GROUNDS = {
    bangalore: {name: "Bengaluru", slots: 1, max: 2},
    chennai: {name: "Chennai", slots: 1, max: -1},
    mysore: {name: "Mysore", slots: 2, max: -1},
    dallas: {name: "Dallas", slots: 3, max: 4}
};

var DIVISIONS = {
    DIV_A: {teams: TEAMS_DIV_A, umpires: 'DIV_B', grounds: [GROUNDS.bangalore, GROUNDS.chennai, GROUNDS.mysore]},
    DIV_B: {teams: TEAMS_DIV_B, umpires: 'DIV_A', grounds: [GROUNDS.bangalore, GROUNDS.chennai, GROUNDS.dallas]}
}


var config = {
    divisions: DIVISIONS,
    grounds: GROUNDS
}

module.exports = config;