require('prototype.spawn')();
var checkSpawn = {

    /** @param {Creep} creep **/
    check: function() {
	    var minimumNumberOfMiners = 4; //good
        var minimumNumberOfTransport = 2; //okay
        var minimumNumberOfUpgraders = 2; //downsize?
        var minimumNumberOfBuilders = 0; //okay
        var minimumNumberOfRepairers = 1;
        var minimumNumberOfWallRepairers = 1;
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
        
        
        if (numberOfRecovery < 3 && (numberOfMiners == 0 || numberOfTransport == 0))
        {
            console.log("Oh no! Not enough miners or transport! Spawning recovery")
            Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], Game.time, {memory: {role: 'recovery'}});
        }
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
        if (minimumNumberOfReservers > numberOfReservers){
            console.log("Attempting to spawn reserver")
            name = Game.spawns['Spawn1'].spawnCreep([CLAIM, CLAIM, MOVE, MOVE], 'Reserver' + Game.time, {memory: {'role': 'reserver', 'home':'E2N2', 'target':'E2N1'}})
        }
        
	}
};

module.exports = checkSpawn;