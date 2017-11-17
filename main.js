require('prototype.spawn')();
var roleMiner = require('role.miner');
var roleTransport = require('role.transport');
var roleRecovery = require('role.recovery');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleExplorer = require('role.explorer');
var roleLorry = require('role.lorry');
var roleReserver = require('role.reserver');

var debug = false;
var target = "E2N1";


module.exports.loop = function () { //Runs every tick
    
    if(Game.time % 100 == 0){
        Game.notify("Energy in Storage: " + Game.rooms["E2N2"].storage.store[RESOURCE_ENERGY], 120)
    }

    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    
    
    var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }
    
    
    var minimumNumberOfMiners = 4; //good
    var minimumNumberOfTransport = 3; //okay
    var minimumNumberOfUpgraders = 2; //downsize?
    var minimumNumberOfBuilders = 0; //okay
    var minimumNumberOfRepairers = 2;
    var minimumNumberOfWallRepairers = 2;
    var minimumNumberOfExplorers = 2;
    var minimumNumberOfLorrys = 1;
    var minimumNumberOfReservers = 1;
    
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    var numberOfTransport = _.sum(Game.creeps, (c) => c.memory.role == 'transport');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfRecovery = _.sum(Game.creeps, (c) => c.memory.role == 'recovery');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
    var numberOfExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'explorer');
    var numberOfLorrys = _.sum(Game.creeps, (c) => c.memory.role == 'lorry');
    var numberOfReservers = _.sum(Game.creeps, (c) => c.memory.role == 'reserver');
    
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
        if(creep.memory.role == 'wallRepairer'){
            roleWallRepairer.run(creep)
        }
        if(creep.memory.role == 'explorer'){
            roleExplorer.run(creep)
        }
        if(creep.memory.role == 'lorry'){
            roleLorry.run(creep)
        }
        if(creep.memory.role == 'reserver'){
            roleReserver.run(creep)
        }

        

        
    }
    
    
    
    var energy = Game.spawns["Spawn1"].room.energyAvailable;
    var unnecEnergy = Game.spawns["Spawn1"].room.energyAvailable;
    if (energy >= 600){
        unnecEnergy = 600
    }
    var name = undefined;
    
    if (numberOfRecovery < 3 && (numberOfMiners == 0 || numberOfTransport == 0))
    {
        console.log("Oh no! Not enough miners or transport! Spawning recovery")
        Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], Game.time, {memory: {role: 'recovery'}});
    }
    if (numberOfMiners >= minimumNumberOfMiners && numberOfTransport >= minimumNumberOfTransport){
    
    }

    
    //Check every 5 ticks
    
    if (Game.time % 10 == 0) {
        
        if (minimumNumberOfMiners > numberOfMiners) {
            var numberOfWPos = _.sum(Game.creeps, (c) => c.memory.wPos == 0 && c.memory.role == 'miner');
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
            name = Game.spawns['Spawn1'].createCustomCreepU(unnecEnergy, 'repairer');
        }
        if (minimumNumberOfWallRepairers > numberOfWallRepairers) {
            console.log("Not enough wall repairers. Attempting to spawn Repairer");
            name = Game.spawns['Spawn1'].createCustomCreepU(unnecEnergy, 'wallRepairer');
        }
        if (minimumNumberOfExplorers > numberOfExplorers){
            console.log("Attempting to spawn explorer")
            name = Game.spawns['Spawn1'].createCustomCreepH(energy, 'explorer', target)
        }
        if (minimumNumberOfLorrys > numberOfLorrys){
            console.log("Attempting to spawn lorry")
            name = Game.spawns['Spawn1'].createCustomCreepT(energy, 'lorry')
        }
    }
    if (Game.time % 20 == 0){
        if (minimumNumberOfReservers > numberOfReservers){
            console.log("Attempting to spawn reserver")
            name = Game.spawns['Spawn1'].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], 'Reserver' + Game.time, {'role': roleName, 'home':'E2N2', 'target':'E2N1'})
        }
        
    }
    
}