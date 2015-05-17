function Team(name, div, type)
{
    this.name = name;
    this.div = div;
    /*
     * type is of LEAGUE_TYPES
     */
    this.type = type;
}

Team.prototype.getDiv = function() {
    return this.div
}

Team.prototype.getName = function() {
    return this.name;
}

Team.prototype.getType = function() {
    return this.type;
}

Team.prototype.toString = function() {
    return this.name +  '(' + this.div + ',' + this.type + ')';
}

module.exports = Team;