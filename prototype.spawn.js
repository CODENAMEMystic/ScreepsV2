module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreepM =
        function(energy, roleName, numberOfWPos, recoveryMode) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor((energy-100) / 100);
            var body = [];
            var workingPosition = 0;
            for (let i = 0; i < numberOfParts; i++) { //cost 100 energy
                body.push(WORK);
            }
            if (energy >= 200) {
                body.push(MOVE);
                body.push(CARRY);
            }
            if(numberOfWPos >= 2){
                workingPosition = 1;
            }
            // create creep with the created body and the given role
            return this.spawnCreep(body, roleName + Game.time, {memory: {'role': roleName, 'working': false, 'wPos': workingPosition, 'recoveryMode': recoveryMode}});
            
        };
    StructureSpawn.prototype.createCustomCreepT =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 150);

            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            // create creep with the created body and the given role
            return this.createCreep(body, roleName + Game.time, {'role': roleName, 'working': false});
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
            return this.createCreep(body, roleName + Game.time, {'role': roleName, 'working': false });
        };
    StructureSpawn.prototype.createCustomCreepB =
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
            var secondaryPart = numberOfParts*200
            if(secondaryPart > 0) {
                var secondaryNumbOfParts = Math.floor((energy-secondaryPart) / 150);
            }
            else {
                var secondaryNumbOfParts = 0;
            }
            for (let i = 0; i < secondaryNumbOfParts; i++){
                body.push(WORK);
                body.push(CARRY);
            }
            // create creep with the created body and the given role
            return this.createCreep(body, roleName + Game.time, {'role': roleName, 'working': false });
        };
    StructureSpawn.prototype.createCustomCreepH =
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
            return this.createCreep(body, roleName + Game.time, {'role': roleName, 'working': false, 'home':'E2N2', 'target':'E2N1', 'sourceIndex':0
            });
        };
        
        
};