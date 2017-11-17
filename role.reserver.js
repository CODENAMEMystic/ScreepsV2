var roleReserver = {
    // a function to run the logic for this role
    run: function(creep) {
        
        creep.say("🏠")
        
        
        
        
        
        if (creep.room.name == creep.memory.home) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            
        }
        
        creep.say('Claim')
        if (creep.room.name == creep.memory.target) {
            creep.say("I made it")
            if(creep.room.controller) {
                if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                
            }
            
        }
    }
};
module.exports = roleReserver;