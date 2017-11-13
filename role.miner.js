var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        if (creep.memory.working == true && creep.carry.energy == creep.carryCapacity)
        {
            creep.say("🛠️ Drop")
            creep.memory.working = false;
        }
        
        
        if (creep.memory.working == true)
        {
            
            var sources = creep.room.find(FIND_SOURCES); //change later to be creep specific location
            
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
        
        //Good
        else
        {
            
            creep.drop(RESOURCE_ENERGY, creep.energy);
            creep.memory.working = true;
        }
        
            
	}
};

module.exports = roleMiner;