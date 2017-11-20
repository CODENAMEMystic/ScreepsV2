require('prototype.spawn')();
var checkSpawn = require('checkSpawn');
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
var run = true;


module.exports.loop = function () { //Runs every tick

    if(Game.cpu.bucket < 5000){
        run = Game.time % 2 == 0
    }
    
    
    if(run){
        if(Game.time % 100 == 0)
        {
            Game.notify("Energy in Storage: " + Game.rooms["E2N2"].storage.store[RESOURCE_ENERGY], 120)
        }
        
        for (let name in Memory.creeps)
        {
            // and checking if the creep is still alive
            if (Game.creeps[name] == undefined)
            {
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
        
        var TimeCheck = Game.time % 30 == 0
        if(TimeCheck){
            console.log(Game.time)
        }
        var energy = Game.spawns["Spawn1"].room.energyAvailable;
        var unnecEnergy = Game.spawns["Spawn1"].room.energyAvailable;
        if (energy >= 600){
            unnecEnergy = 600
        }
        var name = undefined;
        var nearDeathInt = 90
        
    // Run for every spawned creep
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
//------------Role Statements--------------------        
        //if creeps role is miner
            if(creep.memory.role == 'miner')
            {
                roleMiner.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        var numberOfWPos = _.sum(Game.creeps, (c) => c.memory.wPos == 0 && c.memory.role == 'miner');
                        console.log("A Miner is about to die! "+ creep.ticksToLive);
                        name = Game.spawns['Spawn1'].createCustomCreepM(energy, 'miner', numberOfWPos);
                    }
                }
            }
            if(creep.memory.role == 'transport')
            {
                roleTransport.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A transport is about to die! "+creep.ticksToLive)
                        name = Game.spawns['Spawn1'].createCustomCreepT(energy, 'transport');
                    }
                }
            }
            if(creep.memory.role == 'recovery') {
                roleRecovery.run(creep)
                if(minimumNumberOfMiners <= numberOfMiners && minimumNumberOfTransport <= numberOfTransport){
                    creep.say("SUICIDE!")
                    creep.suicide();
                }
            }
            if(creep.memory.role == 'upgrader')
            {
                roleUpgrader.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A Upgrader is about to die! "+ creep.ticksToLive)
                        name = Game.spawns['Spawn1'].createCustomCreepU(energy, 'upgrader');
                    }
                }
            }
            
            if(creep.memory.role == 'builder')
            {
                roleBuilder.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A Builder is about to die! "+creep.ticksToLive)
                        name = Game.spawns['Spawn1'].createCustomCreepB(energy, 'builder');
                    }
                }
                
            } 
            if(creep.memory.role == 'repairer')
            {
                roleRepairer.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A Repairer is about to die! "+creep.ticksToLive)
                        name = Game.spawns['Spawn1'].createCustomCreepU(unnecEnergy, 'repairer');
                    }
                }
                
            }
            if(creep.memory.role == 'wallRepairer')
            {
                roleWallRepairer.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A Wall Repairer is about to die! "+ creep.ticksToLive)
                        name = Game.spawns['Spawn1'].createCustomCreepU(unnecEnergy, 'wallRepairer');
                    }
                }
            }
            if(creep.memory.role == 'explorer')
            {
                roleExplorer.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A Explorer is about to die! "+ creep.ticksToLive)
                        name = Game.spawns['Spawn1'].createCustomCreepH(energy, 'explorer', target)
                    }
                }
            }
            if(creep.memory.role == 'lorry')
            {
                roleLorry.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A Lorry is about to die! "+ creep.ticksToLive)
                        name = Game.spawns['Spawn1'].createCustomCreepT(energy, 'lorry')
                    }
                }
            }
            if(creep.memory.role == 'reserver')
            {
                roleReserver.run(creep)
                if(TimeCheck)
                {
                    if(creep.ticksToLive < nearDeathInt)
                    {
                        console.log("A Reserver is about to die! " + creep.ticksToLive)
                        name = Game.spawns['Spawn1'].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], 'Reserver' + Game.time, {memory: {'role': 'reserver', 'home':'E2N2', 'target':'E2N1'}})
                    }
                }
            }
        }
        //Check every 5 ticks
        if (Game.time % 100 == 0)
        {
            checkSpawn.check()
        }
    }
    if(Game.cpu.bucket != 10000){
        aign = Game.cpu.bucket
        
        console.log("CPU Tick Usage: "+ (10000 - aign))
    }
}