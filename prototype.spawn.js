module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreepM =
        function(energy, roleName, numberOfWPos) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor((energy-100) / 100);
            var body = [];
            var workingPosition = 0;
            for (let i = 0; i < numberOfParts; i++) { //cost 100 energy
                body.push(WORK);
            }
            body.push(MOVE);
            body.push(CARRY);
            
            if(numberOfWPos >= 4){
                workingPosition = 1;
            }
            // create creep with the created body and the given role
            return this.spawnCreep(body, Game.time, {memory: {'role': roleName, 'working': false, 'wPos': workingPosition}});
            
        };
    StructureSpawn.prototype.createCustomCreepT =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 100);

            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            // create creep with the created body and the given role
            return this.createCreep(body, Game.time, {'role': roleName, 'working': false});
        };
    StructureSpawn.prototype.createCustomCreepU =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            // create creep with the created body and the given role
            return this.createCreep(body, Game.time, {'role': roleName, 'working': false });
        };
        StructureSpawn.prototype.createCustomCreepB =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 350);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            if(energy >= 350){
                body.push(CARRY);
            }
            // create creep with the created body and the given role
            return this.createCreep(body, Game.time, {'role': roleName, 'working': false });
        };
};