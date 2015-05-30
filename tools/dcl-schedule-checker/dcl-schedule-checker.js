/**
 * Created by rramachandra on 2015-05-27.
 */

var fs=require("fs");
var _ = require("underscore");
//var csvFile = "./test.csv";
var csvFile = "./dcl-summer-latest.csv";
//var csvFile = "./cirrus.csv";
var matches = [];
var divisions = [];
var teams = [];


/* BEGIN OF MATCH */
/*
Split: 1
Split: WK 1
Split: 5/16/2015
Split: B
Split: Indian Snipers (TeCHricketers)
Split: Dallas Tigers
Split: Allen Cricket Ground on Alma
Split: Zeo Warriors
Split: Lycans
Split: Saturday
Split: 7:30 am - 11:30 pm
*/
/***
 *
 * @param num
 * @param week
 * @param date
 * @param div
 * @param t1
 * @param t2
 * @param u1
 * @param u2
 * @param weekday
 * @param time
 * @constructor
 */
function Match(num, week, date, div, t1, t2, ground, u1, u2, weekday, time) {
    this.num = num;
    this.week = week;
    this.date = date;
    this.div = div;
    this.t1 = t1;
    this.t2 = t2;
    this.ground =ground;
    this.u1 = u1;
    this.u2 = u2;
    this.weekday = weekday;
    this.time = time.replace(/\s+/g, '');
};
Match.prototype.toString = function() {
    return this.num + ". " +  this.div + ' - ' + this.t1 + "  vs  " + this.t2 + '  U:{' + this.u1 + ',' + this.u2 + '}' + ' @ ' + this.ground +  " at "  +  '[' + this.date + "," + this.time + ']';
};

/* END OF MATCH */

var getTeam = function(teamName) {
    for(var i = 0 ; i < teams.length; ++i) {
        if (teamName === teams[i].name) {
            return teams[i];
        }
    }
    return null;
};

var addTeam = function(newTeam) {
    if( null === getTeam(newTeam.name)) {
        //console.log("Adding new Team " + newTeam.name);
        teams.push(newTeam);
    }
    return newTeam;
};

function Team(name) {
    this.name = name;
    this.div = [];
    this.matches = [];
    this.umpiring = [];
}

Team.prototype.addMatch = function(m) {
    this.matches.push(m);
};

Team.prototype.addUmpiring = function(m) {
    this.umpiring.push(m);
};

/* BEGIN DIVISION */
var getDivision = function(divName) {
    for(var i = 0 ; i < divisions.length; ++i) {
        if (divName === divisions[i].name) {
            return divisions[i];
        }
    }
    return null;
};

var addDivision = function(newDiv)
{
    if( null === getDivision(newDiv.name)) {
        //console.log("Adding new Division " + newDiv.name);
        divisions.push(newDiv);
    }
    return newDiv;
};

/**
 *
 * @param name
 * @constructor
 */

function Division(name) {
    this.name = name;
    this.teams = [];
};

Division.prototype.findTeam = function(teamName) {
    var index = teams.indexOf(teamName);
    if (index === -1) {
        return null;
    }
    return getTeam(teamName);
};

Division.prototype.addTeam = function(newTeam) {
    if(null === this.findTeam(newTeam.name)) {
        //console.log("Added new team " + newTeam.name + " to Div: " +  this.name);
        this.teams.push(newTeam.name);
    }

    //console.log("Warning " + newTeam.name + " already in Div: " + this.name);
    return newTeam;
};
/* END OF DIVISION */


/**
 *
 * @param line
 */
var parseLinesToMatches = function(line) {

    console.log(typeof line);
    if(line[0] === ',') {
        line = line.substring(1, line.length);
    }
    console.log(line);
    var split = line.split(',');
    for (i in split) {
        //console.log("Split: " + split[i]);
    }
    if (split.length >= 11) {
        var m = new Match(split[0], split[1], split[2], split[3], split[4], split[5], split[6], split[7], split[8], split[9], split[10]);
        matches.push(m);
    }
};


var parseFile = function(fileName) {
    var lineArray = fs.readFileSync(fileName).toString().split("\n");
    for(i in lineArray) {
        //console.log("Line:" + lineArray[i]);
        parseLinesToMatches(lineArray[i]);
    }

};

var extractMatchInfo = function(match) {
    //console.log("Match Analysis: " + match.t1 + ' vs ' + match.t2);
    var team1 = getTeam(match.t1);
    var div = match.div;

    if(team1 === null) {
        team1 = addTeam(new Team(match.t1));
    }
    if(team1.div.length === 0 || team1.div.indexOf(div) === -1)
        team1.div.push(div);

    var team2 = getTeam(match.t2);
    if(team2 === null) {
        team2 = addTeam(new Team(match.t2));
    }

    if(team2.div.length === 0 || team2.div.indexOf(div) === -1)
        team2.div.push(div);


    team1.addMatch(match);
    team2.addMatch(match);

    var uteam1 = getTeam(match.u1);
    if (uteam1 === null) {
        uteam1 = addTeam(new Team(match.u1));
    }

    var uteam2 = getTeam(match.u2);
    if (uteam2 === null) {
        uteam2 = addTeam(new Team(match.u2));
    }

    uteam1.addUmpiring(match);
    uteam2.addUmpiring(match);
};


var analyzeMatches = function() {
    ////console.log("******** AnalyzeMatches ***************");
    for (var i = 0; i < matches.length; ++i) {
        var m = matches[i];
        //console.log("Analyzing Match : " + m.toString());
        extractMatchInfo(m);
    }
};

var runAnalyzer =function() {
    //console.log("Running Analyzer: " + csvFile);
    parseFile(csvFile);
    for (i in matches) {
        //console.log(matches[i].toString());
    }
    analyzeMatches();
};


var getGroundStats = function(matches) {
    var len = matches.length;
    var groundStats = {};
    for ( var i = 0; i < len; ++i) {
        var m = matches[i];
        if (groundStats.hasOwnProperty(m.ground)) {
            groundStats[m.ground]++;
        } else {
            groundStats[m.ground] = 1;
        }
    }
    return groundStats;
}

var dumpGroundStats = function(gs)
{
    var sortedKeys = Object.keys(gs).sort(function(a,b) {return gs[b] - gs[a] });
    //console.log(sortedKeys);
    console.log('------ Ground Stats ------');
    for (var i = 0; i < sortedKeys.length; ++i) {
        var k = sortedKeys[i];
        console.log(gs[k] + " : " + k );
    }
    console.log('------------------------');
};

var getSlotStats = function(matches) {
    var len = matches.length;
    var slotStats = { };
    for ( var i = 0; i < len; ++i) {
        var m = matches[i];
        if (slotStats.hasOwnProperty(m.time)) {
            slotStats[m.time]++;
        } else {
            slotStats[m.time] = 1;
        }
    }
    return slotStats;
}

var dumpSlotStats = function(ss)
{
    var sortedKeys = Object.keys(ss).sort(function(a,b) {return ss[b] - ss[a] });
    //console.log(sortedKeys);
    console.log('------ Slot Stats ------');
    for (var i = 0; i < sortedKeys.length; ++i) {
        var k = sortedKeys[i];
        console.log(ss[k] + " : " + k );
    }
    console.log('------------------------');
};

var dumpMatches = function(matches) {
    for (var i = 0 ; i < matches.length; ++i) {
        console.log(matches[i].toString());
    }
    console.log("--------------------------------------------");
};

var gatherTeamStats = function(team) {
    var numOfMatches = team.matches.length;
    var numOfUmpiring = team.umpiring.length;
    var matchGroundStats = getGroundStats(team.matches);
    var umpiringGroundStats = getGroundStats(team.umpiring);
    var matchSlotStats = getSlotStats(team.matches);
    var umpiringSlotStats = getSlotStats(team.umpiring);

    console.log("\n *********************************************************************");
    console.log("     STATS:" + team.name  + " Division : " + team.div);
    console.log("\n *********************************************************************");
    console.log("\n-------------------------- MATCH STATS -----------------------------");
    dumpMatches(team.matches);
    console.log("\nNumber of Matches: " + numOfMatches);
    dumpGroundStats(matchGroundStats);
    console.log("\n Match Slots Stats : ");
    dumpSlotStats(matchSlotStats);
    console.log("\n----------------------END OF MATCH STATS ---------------------------");

    console.log("\n----------------------- UMPIRING STATS -------------------------------");
    dumpMatches(team.umpiring);
    console.log("\nNumber of Umpiring: " +  numOfUmpiring);
    dumpGroundStats(umpiringGroundStats);
    dumpSlotStats(umpiringSlotStats);
    console.log("\n----------------------END OF UMPIRING STATS ---------------------------");
    console.log("\n *********************************************************************");
};

var checkScheduleConflicts = function(team) {
    console.log(" Checking Conflicts : " + team.name);
    var conflicts = [];
    /*  Logic: we check every match date against every other match and umpiring schedule
     *  if we have the same date either for a match or umpiring then it is a conflict
     */

    // first we make a single array, to traverse and also put markers to identify match vs umpiring
    var matches = team.matches;
    var umpiring = team.umpiring;

    var combined = [];
    for(var i = 0; i < matches.length; ++i) {
        var m = _.clone(matches[i]);
        m.type = 'M';
        m.hasConflict = false;
        combined.push(m);
    }
    for(var i = 0; i < umpiring.length; ++i) {
        var u = _.clone(umpiring[i]);
        u.type = 'U';
        u.hasConflict = false;
        combined.push(u);
    }

    var checkConflict = function(checkMatch, theIndex, theCombinedArray) {
        var date = checkMatch.date;
        var c = { conflict: []};
        c.conflict.push(checkMatch);
        for(var i = theIndex + 1; i < theCombinedArray.length; ++i) {
            // checkMatch against Match for conflicts
            var againstMatch = theCombinedArray[i];
            // found two things on the same day
            if (date === againstMatch.date) {
                // It is NOT a conflict to have 2 Umpiring on the same day.
                // Any other combination is a conflict
                if (!(checkMatch.type === 'U' && againstMatch.type === 'U')) {
                    againstMatch.hasConflict = true;
                    c.conflict.push(againstMatch);
                }
            }
        }
        if(c.conflict.length > 1) {
            return c;
        }
        return null;
    };

    for(var i = 0; i < combined.length; ++i) {
        var checkMatch = combined[i];
        if (checkMatch.hasConflict) {
            continue;
        }

        conflict = checkConflict(checkMatch, i, combined);
        if (conflict) {
            conflicts.push(conflict);
        }
    }
    return conflicts;
};


var sortTeams = function() {
    var teamNames = [];
    for(var i = 0; i < teams.length; ++i) {
        teamNames.push(teams[i].name);
    }
    var sorted = teamNames.sort();

    return sorted;
};


/* Actual code */
runAnalyzer();
var sorted = sortTeams();
console.log("\n****** DCL SUMMER 2015   **************\n");
console.log(" Total Number of matches :"  + matches.length);
console.log(" Total Number of teams :"  + teams.length);
console.log("\n********************************************");

/*
for(var i = 0; i < sorted.length; ++i) {
    gatherTeamStats(getTeam(sorted[i]));
}
*/

console.log("\n********************************************");
console.log("            Checking Conflicts ");
console.log("********************************************\n");
for(var i = 0; i < sorted.length; ++i) {
    var t = getTeam(sorted[i]);
    console.log("----------------------------------------");
    var conflicts  = checkScheduleConflicts(t);
    if (conflicts.length) {
        console.log(" Team : " + t.name);
        console.log(" Conflicts: " + JSON.stringify(conflicts));
    } else {
        console.log(" Team : " + t.name + " No Conflicts!");
    }
    console.log("----------------------------------------");
}

