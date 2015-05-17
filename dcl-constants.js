/*
 * This file is used for fixed values and enums used accross the scheduler
 */

var LEAGUE_TYPES = { LEATHER: 'L', TAPE: 'T' }
var DIV_TYPES = { DIV_A: 'div_a', DIV_B: 'div_b'};
var GROUND_TYPES = {LEATHER_ONLY:'L', TAPE_ONLY:'T', BOTH:'B'};
var DAYS_OF_WEEK = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

var dclConstants = {
    DAYS_OF_WEEK: DAYS_OF_WEEK,
    LEAGUE_TYPES: LEAGUE_TYPES,
    DIV_TYPES: DIV_TYPES,
    GROUND_TYPES: GROUND_TYPES
}

module.exports = dclConstants;