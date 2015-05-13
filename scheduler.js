var config = require('./config.js');
var roundRobin = require('./round-robin.js');
var log = require('./logger.js')();
var dclSummer = require('./dcl-summer.js');

// We need atleast 4 teams to have 2 neutral umpires
var MIN_NUM_OF_TEAMS_REQUIRED_FOR_NEUTRAL_UMPIRES = 4;

var schedule = function(config) {
    log.info("Scheduling DCL Spring Games!!!");

    /*
    console.log(teams);
    log.info({teams_length: teams.length}, "Number of Teams: ");
    if (teams.length < MIN_NUM_OF_TEAMS_REQUIRED_FOR_NEUTRAL_UMPIRES) {
        log.error("Error Min Number of Team Required not met");
        return new Error("Min number of teams required for Neutral Umpires is: " +
            MIN_NUM_OF_TEAMS_REQUIRED_FOR_NEUTRAL_UMPIRES + " but there are only: " + teams.length + " teams");
    }
    */
    //var matches = roundRobin(teams);
    //log.info("Total number of matches:" + matches.length);
    //log.info({matches: matches}, "Round Robin Matches: ");
    dclSummer(config);
}

schedule(config);


