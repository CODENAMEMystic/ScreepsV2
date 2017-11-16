var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.carry.energy == 0) {
	        
	      structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 0
                )});
            if (structure != undefined) {
                
                // try to transfer energy, if it is not in range
                if(creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure)
                    
                }
              
            }
	    }
	        /*
            var energy = creep.pos.findInRange(
                FIND_DROPPED_RESOURCES,
                50);
                
            if (energy.length) {
                //console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
                //creep.say('Upgrade!!')
                creep.moveTo(energy[0]);
                creep.pickup(energy[0]);
                }
        }
        
        */
        else {
            
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;