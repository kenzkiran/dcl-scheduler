var roundRobin = require('./round-robin.js');
var groundAllocator = require('./ground-allocator.js');
var log = require('./logger.js')();

var scheduleSummer = function(config) {

    //TODO: validate these
    var teams = config.teams;
    var grounds = config.grounds;

    var matches = roundRobin(teams);

    if (matches && matches.length > 0) {

    }
    log.info({slots: groundAllocator(null, grounds)}, "DCL Summer: Ground Slots: ");
}

module.exports = scheduleSummer;