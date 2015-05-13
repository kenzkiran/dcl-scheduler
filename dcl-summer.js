var roundRobin = require('./round-robin.js');
var Match = require('./Match.js');
var Divisions = require('./divisions.js');
var groundAllocator = require('./ground-allocator.js');
var log = require('./logger.js')();


var expandDivisions = function(options, division) {

}
var scheduleSummer = function(config) {

    var grounds = config.grounds;
    var divisions = config.divisions;

    var div_a = divisions.DIV_A;
    var div_b = divisions.DIV_B;

    //div_a.matches = roundRobin(Divisions.getTeams.call(div_a))
    log.info({teams: Divisions.prototype.getTeams.call(div_a)});

    //log.info({slots: groundAllocator(null, grounds)}, "DCL Summer: Ground Slots: ");

}

module.exports = scheduleSummer;