var roleMiner = require('role.miner');
var roleTransport = require('role.transport');
var roleRecovery = require('role.recovery');

var debug = false;


module.exports.loop = function () { //Runs every tick

    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    
    // Run for every spawned creep
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
//------------Role Statements--------------------        
        //if creeps role is miner
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep)
        }
        //if creeps role is transport
        if(creep.memory.role == 'transport') {
            roleTransport.run(creep)
        }
        if(creep.memory.role == 'recovery') {
            roleRecovery.run(creep)
        }

        
    }
    var minimumNumberOfMiners = 3;
    var minimumNumberOfTransport = 1;
    
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    var numberOfTransport = _.sum(Game.creeps, (c) => c.memory.role == 'transport');
    var numberOfRecovery = _.sum(Game.creeps, (c) => c.memory.role == 'recovery');
    
    if (numberOfMiners == 0 || numberOfTransport == 0 && numberOfRecovery < 3 )
    {
        console.log("Oh no! Not enough miners or transport! Spawning recovery")
        //Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], Game.time, {memory: {role: 'recovery'}});
    }
    //Check every 5 ticks
    if (Game.time % 5 == 0) {
        if (minimumNumberOfMiners > numberOfMiners) {
            console.log("Not enough miners. Attempting to spawn Miner");
            Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, MOVE], Game.time, {memory: {role: 'miner', working: "false"}});
        }
        if (minimumNumberOfTransport > numberOfTransport) {
            console.log("Not enough transporters. Attempting to spawn transport");
            Game.spawns['Spawn1'].spawnCreep( [MOVE, CARRY, MOVE, CARRY], Game.time, {memory: {role: 'transport', working: "false"}});
        }
        
        
    }    
}