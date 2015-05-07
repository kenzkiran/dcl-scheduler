var _ = require('underscore');
var assert = require('assert');
var log = require('./logger')();
var Match = require('./Match.js');


/***
 * Assign a match ID, will be useful in future.
 */
var getMatchId = function(matchNumber) {
    return 'TT-' + matchNumber;
}

/***
 * Schedules every team against every body else
 * @param teams {Array of objects} every team will play against everybody else
 * @param conditions {object}
 */
var schedRoundRobin = function(teams, matches, matchNumber) {
    if ( !Array.isArray(teams) ) {
        assert("Invalid Type of team, needs to be an Array");
    }
    if (teams.length < 2) {
        return;
    }
    var teamOne = teams[0];
    var remainingTeams = teams.slice(1);
    //log.info({remaing: remainingTeams}, "Remaining teams: ");
    for(var i = 0; i < remainingTeams.length; ++i) {
        var match = new Match(teams[0].name, remainingTeams[i].name);
        match.setId(getMatchId(matchNumber++));
        matches.push(match);
        log.info("New Match: " + match.toString());
    }
    //console.log("Current Matches: " + JSON.stringify(matches));
    return schedRoundRobin(remainingTeams, matches, matchNumber);
}

var roundRobin = function(teams, conditions) {
    var matches = [];
    var matchNumber = 0;
    log.info({teams: teams}, "Now running: Round Robin Schedule: ");
    schedRoundRobin(teams, matches, matchNumber);
    return matches;
}

module.exports = roundRobin;

