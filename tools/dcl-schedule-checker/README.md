### DCL SCHEDULE CHECKER

This is DCL Schedule checker. This code will consider a Schedule Conflict if the following conditions are met:

1. A Team has 'Match' and 'Umpiring' on the same DAY.
2. A Team has two or more 'Match'es on the same DAY

Note: A Team can have two or more 'Umpiring' on the same day.  
Note: If a Team registers for Tape ball and Leather ball in two different names, the algorithm will consider it two teams.  
We only check "unique" team by "name". 

## Input

1. The input should be a CSV (comma seperated file).  
2. The format should be as below:  
    1,WK 1,5/16/2015,B,Indian Snipers (TeCHricketers),Dallas Tigers,Allen Cricket Ground on Alma,Zeo Warriors,Lycans,Saturday,7:30 am - 11:30 pm  
        or
        
    ,1,WK 1,5/16/2015,B,Indian Snipers (TeCHricketers),Dallas Tigers,Allen Cricket Ground on Alma,Zeo Warriors,Lycans,Saturday,7:30 am - 11:30 pm    
     (A leading ',' will be removed) 
      
The above line will split into the following sections:   
     Number: 1  
     Week: WK 1  
     Date: 5/16/2015  
     Div: B  
     T1: Indian Snipers (TeCHricketers)  
     T2: Dallas Tigers  
     Ground: Allen Cricket Ground on Alma  
     U1: Zeo Warriors  
     U2: Lycans  
     Day: Saturday  
     Slot: 7:30 am - 11:30 pm  
     
## Usage

* For the first time only: **npm install** 
* Any subsequent time: **node dcl-schedule-checker.js input_your_csv_file**
  * Eg: **node dcl-schedule-checker.js dcl-summer-latest.csv**
* If 'NO' input .csv file is provided it will assume 'schedule.csv' as the input file.


## Bonus

The current one also collects simple stats about the games scheduled. Here is a sample one for a team:
 
```
/*
 *********************************************************************  
     STATS:Cirrus Division : B  
 *********************************************************************  
  
-------------------------- MATCH STATS -----------------------------  
2. B - Cirrus  vs  Giant Strikers  U:{Ballbusters,Friends CC} @ Allen Cricket Ground on Alma at [5/16/2015,11:30am-3:30pm]  
63. B - Cirrus  vs  Indian Snipers (TeCHricketers)  U:{Desi Boyz,Swadeshi Stars} @ Russell Creek G3 at [6/14/2015,11:30am-3:30pm]  
94. B - Cirrus  vs  Dallas Tigers  U:{Boomstick Mafia CC,Chennai Rockerz} @ Russell Creek G4 at [6/21/2015,11:30am-3:30pm]  
110. B - Cirrus  vs  Dallas Chargers  U:{Anveta Bulls,Desi Boyz} @ Russell Creek G4 at [6/27/2015,7:30am-11:30am]  
138. B - Cirrus  vs  King Cobras CC  U:{Zeo Warriors,Blazing XI} @ Russell Creek G4 at [7/11/2015,7:30am-11:30am]  
167. B - Cirrus  vs  Plano Packers  U:{Zeo Warriors,Lycans} @ Allen Cricket Ground on Alma at [7/19/2015,7:30am-11:30am]  
183. B - Cirrus  vs  Plano Tigers  U:{Zeo Warriors,United Eleven} @ Russell Creek G4 at [7/25/2015,11:30am-3:30pm]  
209. B - Cirrus  vs  Incredible Indians  U:{The AMPS,United Eleven} @ Russell Creek G7 at [8/2/2015,7:30am-11:30am]  
229. B - Cirrus  vs  Lagaan XI  U:{Ballbusters,Cycle Stand} @ Garland Cricket Ground at [8/15/2015,7:30am-11:30am]    
--------------------------------------------    
  
Number of Matches: 9 
 
------ Ground Stats ------  
4 : Russell Creek G4  
2 : Allen Cricket Ground on Alma  
1 : Russell Creek G3  
1 : Russell Creek G7  
1 : Garland Cricket Ground  
------------------------  

 Match Slots Stats : 
   
------ Slot Stats ------  
5 : 7:30am-11:30am  
4 : 11:30am-3:30pm  
------------------------  

----------------------END OF MATCH STATS ---------------------------  
  
----------------------- UMPIRING STATS -------------------------------  
28. A - Challengers CC  vs  Dallas Dynamites  U:{Cirrus,India Blues} @ Dodd Park Cricket Ground at [5/31/2015,3:30pm-7:30pm]  
53. A - Challengers CC  vs  ACE XI  U:{Cirrus,Boomstick Mafia CC} @ Russell Creek G4 at [6/13/2015,7:30am-11:30am]  
81. A - Royals Cricket Club  vs  Dallas Dynamites  U:{Cirrus,Friends CC} @ Russell Creek G4 at [6/20/2015,7:30am-11:30am]  
85. A - Curd Rice Cricket Club  vs  ACE XI  U:{Cirrus,Friends CC} @ Russell Creek G6 at [6/20/2015,7:30am-11:30am]  
117. A - Texas Titans  vs  Dallas Daredevils  U:{Cirrus,Giant Strikers} @ Dodd Park Cricket Ground at [6/28/2015,7:30am-11:30am]  
154. A - Dallas Dynamites  vs  Irving Chargers  U:{Cirrus,Lagaan XI} @ Russell Creek G7 at [7/12/2015,7:30am-11:30am]  
166. A - Dallas Dynamites  vs  ACE XI  U:{Cirrus,King Cobras CC} @ Russell Creek G7 at [7/18/2015,11:30am-3:30pm]  
201. A - Challengers CC  vs  Texas Titans  U:{Cirrus,Plano Packers} @ Russell Creek G3 at [8/1/2015,11:30am-3:30pm]  
242. D - VR Lions  vs  Chennai Rockerz  U:{Cirrus,Incredible Indians} @ Russell Creek G3 at [8/16/2015,11:30am-3:30pm]  
--------------------------------------------  

Number of Umpiring: 9 
 
------ Ground Stats ------    
2 : Dodd Park Cricket Ground  
2 : Russell Creek G4  
2 : Russell Creek G7  
2 : Russell Creek G3  
1 : Russell Creek G6  
------------------------
    
------ Slot Stats ------  
5 : 7:30am-11:30am  
3 : 11:30am-3:30pm  
1 : 3:30pm-7:30pm    
------------------------    

----------------------END OF UMPIRING STATS ---------------------------

 *********************************************************************  
*/
```

**Note: More stats comming later....**