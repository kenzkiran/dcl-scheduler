var dclConstants = require('./dcl-constants.js');
var INFINITY =  Number.POSITIVE_INFINITY;

var GROUND_TYPES = dclConstants.GROUND_TYPES;
var DAYS_OF_WEEK  = dclConstants.DAYS_OF_WEEK;

function Ground(name, options) {

    this.name = name;
    this.options = options || {};
    /* If number of slots per day is not available we assume
     * there is only 1 slot per day
     */
    if (typeof options.slots !== 'number')
        options.slots = 1;

    if (typeof options.max !== 'number')
        options.max = INFINITY;

    /*
     * We assume initially that a ground is
     * available for both Leather and TAPE
     */
    options.type = GROUND_TYPES.BOTH;

    /*
     * We assume initially that it is available
     * only on weekends
     */
    options.availability = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: true,
      sun: true
    };
}

Ground.prototype.getName = function() {
    return this.name;
};

Ground.prototype.getAvailability = function() {
    return this.options.availability;
};

/**
 * Sets day of week availability for the ground
 * @param dayOfTheWeek
 * @param available {boolean} optional, defaults to true;
 */
Ground.prototype.setAvailability = function(dayOfTheWeek, available) {
    available = available || true;
    if (DAYS_OF_WEEK.indexOf(dayOfTheWeek) !== -1)
        this.options.availability[dayOfTheWeek] = available;
}

Ground.prototype.isAvailableOnDay = function(dayOfTheWeek) {
    return this.options.availability[dayOfTheWeek] === true;
}

/* For now assume */
Ground.prototype.getSlots = function() {
    return this.options.slots;
};

Ground.prototype.forLeather = function() {
    if (this.options.type === GROUND_TYPES.LEATHER_ONLY  || this.options.type === GROUND_TYPES.BOTH) {
        return true;
    }
    return false;
};

Ground.prototype.forTape = function() {
    if (this.options.type === GROUND_TYPES.TAPE_ONLY  || this.options.type === GROUND_TYPES.BOTH) {
        return true;
    }
    return false;
};

Ground.prototype.toString = function() {
    return "Ground: " + this.name;
}

module.exports = Ground;
