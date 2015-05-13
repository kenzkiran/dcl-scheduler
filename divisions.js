function Divisions() {
    this.teams = [];
    this.umpires = [];
    this.grounds = [];
};

/***
 *
 * @param teams {array of teams}
 */
Divisions.prototype.setTeams = function(teams) {
    this.teams = teams;
}

Divisions.prototype.getTeams = function(teams) {
    return this.teams;
}

/***
 * Set Umpiring Division name
 * @param umpiresFrom {string} name of the division that will umpire
 * @returns {*}
 */
Divisions.prototype.setUmpires = function(umpiresFrom) {
    this.umpires = umpiresFrom;
}

Divisions.prototype.getUmpires = function() {
    return this.umpires;
}

/**
 * Set Grounds for this Division
 * @param grounds
 */
Divisions.prototype.setGrounds = function(grounds) {
    this.grounds = grounds;
}

Divisions.prototype.getGrounds = function() {
    return this.grounds;
}

module.exports = Divisions;