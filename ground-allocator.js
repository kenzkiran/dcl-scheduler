/**
 * Created by rramachandra on 2015-05-07.
 */

var _ = require('underscore');
var dclConstants = require('./dcl-constants.js');
var log = require('./logger.js')();

var DAYS_OF_WEEK = dclConstants.DAYS_OF_WEEK;
var DIST_SEQUENTIAL = 'SEQUENTIAL';
var DIST_SPREAD = 'SPREAD'


/***
 * Allocates Ground and time slot for a given match
 * @param grounds {Array} array of ground objects - check Grounds.js
 * @param options {object} for future use
 * @returns {*}
 */
var groundAllocator = function(dayOfTheWeek, grounds, options) {
    return getGroundSlotUnitsForDay(dayOfTheWeek, grounds, options);
}


/***
 * From the available list of 'grounds', get list of
 * grounds available on the 'dayOfTheWeek'
 */
var getGroundsForDay = function(dayOfTheWeek, allGrounds) {
    var  grounds = [];
    log.info("Getting Grounds for the day: " + dayOfTheWeek);
    if ( DAYS_OF_WEEK.indexOf(dayOfTheWeek) === -1 ) {
        log.error({dayOfTheWeek: dayOfTheWeek}, "Invalid dayOfTheWeek: ");
        return grounds;
    }
    for (var i = 0; i < allGrounds.length; ++i) {
        var ground = allGrounds[i];
        if ( ground.isAvailableOnDay(dayOfTheWeek) ) {
            log.info(ground.getName() + "available on " + dayOfTheWeek );
            grounds.push(ground);
        }
    }
    return grounds;
}

/***
 * Will return all Ground Slot Units for the given dayOfTheWeek
 * e.g getGroundSlotUnitsForDay('mon', allGrounds) will return
 * all possible groundSlots on 'mon'.
 * @param dayOfTheWeek {string} mon to sun
 * @param allGrounds {Array} of ground objects
 * @param options {object} Optional
 * @returns {Array}
 */
var getGroundSlotUnitsForDay = function(dayOfTheWeek, allGrounds, options) {
    var grounds = getGroundsForDay(dayOfTheWeek, allGrounds);
    if (grounds.length === 0) {
        log.error("No ground available for the day" + dayOfTheWeek);
        return [];
    }
    return getGroundSlotUnits(grounds, options);
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
        var numSlots = ground.getSlots();
        for (var j = 0; j < numSlots; ++j) {
            var gs = { ground: ground.getName(), slot: j};
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
            var slots = ground.getSlots();
            if (slots > 0) {
                var gs = {ground: ground.getName(), slot: slots - 1};
                groundSlots.unshift(gs);
                slots--;
                done = false;
            }
        }
    } while(!done);

    return groundSlots;
}

module.exports = groundAllocator;
