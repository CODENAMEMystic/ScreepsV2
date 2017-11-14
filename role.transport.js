var roleTransport = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.memory.working == true && creep.carry.energy == 0)
        {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }
        
	    if(creep.memory.working == false) {
	        creep.say('⚙')
            var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 50);
            if (energy.length) {
               // console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
               creep.moveTo(energy[0]);
               creep.pickup(energy[0]);
            }
            
        }
        else {
            
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });
            
            
            if (structure == undefined) {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] < s.storeCapacity
                )});
            }
            
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            
            
        }
	}
};

module.exports = roleTransport;