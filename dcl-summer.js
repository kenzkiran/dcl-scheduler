var roundRobin = require('./round-robin.js');
var Match = require('./Match.js');
var Divisions = require('./Divisions.js');
var groundAllocator = require('./ground-allocator.js');
var log = require('./logger.js')();

var scheduleSummer = function(config) {

    var grounds = config.grounds;
    var divisions = config.divisions;

    var div_a = divisions.DIV_A;
    var div_b = divisions.DIV_B;

    //div_a.matches = roundRobin(Divisions.prototype.getTeams.call(div_a));
    //div_b.matches = roundRobin(Divisions.prototype.getTeams.call(div_b));

    //log.info({teams: Divisions.prototype.getTeams.call(div_a)});


    //log.info({matches: div_b.matches}, " *****   DIV B MATCHES  *****");
    //log.info({matches: div_a.matches}, " *****   DIV A MATCHES  *****");
    log.info({groundSlots:groundAllocator('fri', div_a.grounds)}, " *****   DIV A GROUND SLOTS (FRI)  *****");
    log.info({groundSlots:groundAllocator('sat', div_a.grounds)}, " *****   DIV A GROUND SLOTS (SAT)  *****");
    log.info({groundSlots:groundAllocator('sun', div_a.grounds)}, " *****   DIV A GROUND SLOTS (SUN)  *****");



    log.info({groundSlots:groundAllocator('fri', div_b.grounds)}, " *****   DIV B GROUND SLOTS (FRI)  *****");
    log.info({groundSlots:groundAllocator('sat', div_b.grounds)}, " *****   DIV B GROUND SLOTS (SAT)  *****");
    log.info({groundSlots:groundAllocator('sun', div_b.grounds)}, " *****   DIV B GROUND SLOTS (SUN)  *****");
    //log.info({slots: groundAllocator(null, grounds)}, "DCL Summer: Ground Slots: ");

}



module.exports = scheduleSummer;