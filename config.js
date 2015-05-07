var TYPE_LEATHER = 'L';
var TYPE_TAPE = 'T'
var TEAMS = [
    { name: "Anderson", div: 'A', type: TYPE_TAPE },
    { name: "Bradman", div: 'A', type: TYPE_TAPE },
    { name: "Crains", div: 'A', type: TYPE_TAPE },
    { name: "Dravid", div: 'A', type: TYPE_TAPE },
    { name: "Eoin", div: 'A', type: TYPE_TAPE },
    { name: "Faulkner", div: 'A', type: TYPE_TAPE }
];

/**
 * @slots {number} Number of slots per day (e.g)
 * @max {number} Max number of games that can be scheduled, -1 = UNLIMITED
 */
var GROUNDS = [
    {name: "Bengaluru", slots: 1, max: 2},
    {name: "Chennai", slots: 1, max: -1},
    {name: "Mysore", slots: 2, max: -1},
    {name: "Dallas", slots: 3, max: 4},
];

var config = {
    teams: TEAMS,
    grounds: GROUNDS
}

module.exports = config;