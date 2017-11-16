var roleUpgrader = require('role.upgrader');

module.exports = {

    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.say("Collect")
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.say("Work")
            creep.memory.working = true;
        }
        

        if (creep.memory.working == true) {
            
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }

        else {
            
            creep.say("Oh")
            
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
            else {
            
            
            var energy = creep.pos.findInRange(
                FIND_DROPPED_RESOURCES,
                50);
                
                
            if (energy.length) {
                //console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
                //creep.say('Build!')
                creep.moveTo(energy[0]);
                creep.pickup(energy[0]);
                }
                creep.memory.working = false;
            }
        }
        
    }
};