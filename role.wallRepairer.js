var roleBuilder = require('role.builder');

module.exports = {
    // a function to run the logic for this role
    /** @param {Creep} creep */
    run: function(creep) {

        if (creep.memory.working == true && creep.carry.energy == 0)
        {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        
        if (creep.memory.working == true) {
            
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
                            || s.structureType == STRUCTURE_RAMPART
            });
            
            var target = undefined;
            
            // loop with increasing percentages
            for (let percentage = 0.0001; percentage <= 1; percentage += 0.0001){
                // find a wall with less than percentage hits
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }
                
                // if there is one
                if (target != undefined) {
                    // break the loop
                    break;
                }
            }
            
            // if we find a wall that has to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }
        }
        else {
            
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
            
            /*
            
            var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 50);
            if (energy.length) {
               // console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
               creep.moveTo(energy[0]);
               creep.pickup(energy[0]);
            }
            
            */
            
        }
        
        // if creep is supposed to get energy
       // else {
         //   creep.getEnergy(true, true);
        //}
    }
};