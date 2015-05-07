var roundRobin = requre('./round-robin.js');
var groundAllocator = require('./ground-allocator.js');

var scheduleSummer = function(config) {

    //TODO: validate these
    var teams = config.teams;
    var grounds = config.grounds;

    var matches = roundRobin(teams);

    if (matches && matches.length > 0) {

    }
}