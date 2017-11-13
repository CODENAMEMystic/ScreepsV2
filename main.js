require('prototype.spawn')();
var roleMiner = require('role.miner');
var roleTransport = require('role.transport');
var roleRecovery = require('role.recovery');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

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
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep)
        }
        if(creep.memory.role == 'builder')
        {
            roleBuilder.run(creep)
        }

        
    }
    var minimumNumberOfMiners = 3;
    var minimumNumberOfTransport = 2;
    var minimumNumberOfUpgraders = 2;
    var minimumNumberOfBuilders = 4;
    
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    var numberOfTransport = _.sum(Game.creeps, (c) => c.memory.role == 'transport');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfRecovery = _.sum(Game.creeps, (c) => c.memory.role == 'recovery');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    
    
    var energy = Game.spawns["Spawn1"].room.energyAvailable;
    var name = undefined;
    
    if (numberOfMiners == 0 || numberOfTransport == 0 && numberOfRecovery < 3 )
    {
        console.log("Oh no! Not enough miners or transport! Spawning recovery")
        Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], Game.time, {memory: {role: 'recovery'}});
    }

    
    //Check every 5 ticks
    if (Game.time % 5 == 0) {
        if (minimumNumberOfMiners > numberOfMiners) {
            console.log("Not enough miners. Attempting to spawn Miner");
            name = Game.spawns['Spawn1'].createCustomCreepM(energy, 'miner');
        }
        if (minimumNumberOfTransport > numberOfTransport) {
            console.log("Not enough transporters. Attempting to spawn transport");
            name = Game.spawns['Spawn1'].createCustomCreepT(energy, 'transport');
        }
        
        if (minimumNumberOfUpgraders > numberOfUpgraders) {
            console.log("Not enough upgraders. Attempting to spawn upgrader");
            name = Game.spawns['Spawn1'].createCustomCreepU(energy, 'upgrader');
        }
        if (minimumNumberOfBuilders > numberOfBuilders) {
            console.log("Not enough builders. Attempting to spawn builder");
            Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, MOVE], Game.time, {memory: {role: 'builder', working: 'false'}});
            
        }
        
        
    }    
}