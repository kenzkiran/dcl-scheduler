/**
 * Created by rramachandra on 2015-05-07.
 */

/**
 * Match Constructor
 * @param teamOne {string} name or id of the team
 * @param teamTwo {string} name or id of the team
 * @constructor
 */
function Match(teamOne, teamTwo) {
    this.teamOne = '';
    this.teamTwo = '';
    this.id = '';

    //TODO: some sanity checking
    if(typeof teamOne === 'string')
        this.teamOne = teamOne;

    if(typeof teamTwo === 'string')
        this.teamTwo = teamTwo;
};

Match.prototype.setTeamOne = function(team) {
    this.teamOne = team;
};

Match.prototype.setTeamTwo = function(team) {
    this.teamTwo = team;
};

Match.prototype.setId = function(id) {
    this.id = id
};

Match.prototype.toString = function() {
    return '' + this.id +  ' : ' + this.teamOne + ' vs ' + this.teamTwo;
}

module.exports  = Match;