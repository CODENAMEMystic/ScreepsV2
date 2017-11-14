require('prototype.spawn')();
var roleMiner = require('role.miner');
var roleTransport = require('role.transport');
var roleRecovery = require('role.recovery');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

var debug = false;


module.exports.loop = function () { //Runs every tick

    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    
    var minimumNumberOfMiners = 7;
    var minimumNumberOfTransport = 3;
    var minimumNumberOfUpgraders = 7;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 2;
    
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    var numberOfTransport = _.sum(Game.creeps, (c) => c.memory.role == 'transport');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfRecovery = _.sum(Game.creeps, (c) => c.memory.role == 'recovery');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    
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
            if(minimumNumberOfMiners <= numberOfMiners && minimumNumberOfTransport <= numberOfTransport){
                creep.say("SUICIDE!")
                creep.suicide();
            }
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep)
        }
        if(creep.memory.role == 'builder')
        {
            roleBuilder.run(creep)
        }
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep)
        }

        
    }
    
    
    
    var energy = Game.spawns["Spawn1"].room.energyAvailable;
    var name = undefined;
    
    if (numberOfRecovery < 3 && (numberOfMiners == 0 || numberOfTransport == 0))
    {
        console.log("Oh no! Not enough miners or transport! Spawning recovery")
        Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], Game.time, {memory: {role: 'recovery'}});
    }
    if (numberOfMiners >= minimumNumberOfMiners && numberOfTransport >= minimumNumberOfTransport){
    
    }

    
    //Check every 5 ticks
    
    if (Game.time % 5 == 0) {
        
        if (minimumNumberOfMiners > numberOfMiners) {
            var numberOfWPos = _.sum(Game.creeps, (c) => c.memory.wPos == 0);
            console.log("Not enough miners. Attempting to spawn Miner");
            name = Game.spawns['Spawn1'].createCustomCreepM(energy, 'miner', numberOfWPos);
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
            name = Game.spawns['Spawn1'].createCustomCreepB(energy, 'builder');
            
        }
        if (minimumNumberOfRepairers > numberOfRepairers) {
            console.log("Not enough repairers. Attempting to spawn Repairer");
            name = Game.spawns['Spawn1'].createCustomCreepU(energy, 'repairer');
        }
        
        
        
    }
    
}