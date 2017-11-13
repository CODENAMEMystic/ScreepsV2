var roleRecovery = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var droppedSources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 50);
            var roomSources = creep.room.find(FIND_SOURCES);
            creep.say("RECOVER!")
            if (droppedSources.length) {
                creep.moveTo(droppedSources[0]);
                creep.pickup(droppedSources[0]);
            }
            else {
                if(creep.harvest(roomSources[0]) == ERR_NOT_IN_RANGE)
                {
                creep.moveTo(roomSources[0]);
                }
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = roleRecovery;