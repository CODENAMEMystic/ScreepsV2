var roleTransport = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.carry.energy < creep.carryCapacity) {
	        
            var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 50);
            if (energy.length) {
               // console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
               creep.moveTo(energy[0]);
               creep.pickup(energy[0]);
            }
            
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = roleTransport;