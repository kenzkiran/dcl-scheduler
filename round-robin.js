var _ = require('underscore');
var assert = require('assert');
var log = require('./logger')();

/***
 * Schedules every team against every body else
 * @param teams {Array of objects} every team will play against everybody else
 * @param conditions {object}
 */
var schedRoundRobin = function(teams, matches) {
    if ( !Array.isArray(teams) ) {
        assert("Invalid Type of team, needs to be an Array");
    }
    if (teams.length === 2) {
        var match = { vs: []};
        match.vs.push(_.clone(teams[0]));
        match.vs.push(_.clone(teams[1]));
        matches.push(match);
        //console.log(JSON.stringify(matches));
        return;
    }

    var teamOne = teams[0];
    var remainingTeams = teams.slice(1);
    //log.info({remaing: remainingTeams}, "Remaining teams: ");
    for(var i = 0; i < remainingTeams.length; ++i) {
        var match = { vs: []};
        match.vs.push(teamOne);
        match.vs.push(remainingTeams[i]);
        matches.push(match);
    }
    //console.log("Current Matches: " + JSON.stringify(matches));
    return schedRoundRobin(remainingTeams, matches);
}
var roundRobin = function(teams, conditions) {
    var matches = [];
    log.info({teams: teams}, "Now running: Round Robin Schedule: ");
    schedRoundRobin(teams, matches);
    return matches;
}

module.exports = roundRobin;

