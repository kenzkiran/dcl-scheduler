/**
 * Created by rramachandra on 2015-05-07.
 */

var _ = require('underscore');
var log = require('./logger.js')();

var DIST_SEQUENTIAL = 'SEQUENTIAL';
var DIST_SPREAD = 'SPREAD'


/***
 * Allocates Ground and time slot for a given match
 * @param matches {Array} array of matches {vs: []}
 * @param grounds {Array} array of ground objects {name:'', slots: ''}
 * @param options {object} for future use
 * @returns {*}
 */
var groundAllocator = function(matches, grounds, options) {
    return getGroundSlotUnits(grounds);
}


// Basically go through each ground and every slot and make a list of all
// possible ground-slot combination so that a match can be played on a specific groundSlot
// A groundSlot is { ground: 'name' , slot: ''} object.
// This will 'NOT' take into account any max number of matches that can be played.
// This will give all possible combinations of grounds and slots.
// Example: G1 - 3 slots  G2 - 1 slot will produce
// { G1 - 0 , G1 - 1, G1 - 2 }
// { G2 - 0 , G2 - 1}
// This information of "max" games and other params need to be used during "Allocation" phase.
// Option : 'Sequential' or 'Distribute' will cause the ground slot
// Sequential is G1 - 0, G1 - 1, G1 - 2 and then G2 - 0 , G2 - 1
// Distribute is G1 - 0, G2 - 0, G1 - 1 and then G2 - 1, G1 - 2
var getGroundSlotUnits = function(grounds, options) {
    var grounds = _.clone(grounds);
    options = options || {dist: DIST_SEQUENTIAL};

    if (options.dist === DIST_SEQUENTIAL) {
        return getGroundSlotsSeq(grounds);
    }
    return getGroundSlotsSpread(grounds);
}


var getGroundSlotsSeq = function(grounds) {
    var groundSlots = [];
    var numGrounds = grounds.length;
    log.info("getGroundSlotsSeq ");
    for (var i = 0 ; i < numGrounds; ++i) {
        var ground = grounds[i];
        var numSlots = ground.slots;
        for (var j = 0; j < numSlots; ++j) {
            var gs = { ground: ground.name, slot: j};
            groundSlots.push(gs);
        }
    }
    return groundSlots;
}

var getGroundSlotsSpread = function(grounds) {
    var groundSlots = [];
    var done = false;
    log.info("getGroundSlotsSpread ");
    do {
        done = true;
        for(var i = 0; i < grounds.length; ++i) {
            var ground = grounds[i];
            if (ground.slots > 0) {
                var gs = {ground: ground.name, slot: ground.slots - 1};
                groundSlots.unshift(gs);
                ground.slots--;
                done = false;
            }
        }
    } while(!done);

    return groundSlots;
}

module.exports = groundAllocator;
