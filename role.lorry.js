var roleLorry = {

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
	        creep.say('♲')
            
            
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                            && s.store[RESOURCE_ENERGY] > 0
            )}); 
            
            if (structure == undefined){
                structure = creep.room.storage;
            }
            
            if(structure != undefined){
                if(creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            
            
            
        }
        else {
            
                
            
            
            
            if(structure == undefined) {
            
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy+1 < s.energyCapacity
            });
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

module.exports = roleLorry;