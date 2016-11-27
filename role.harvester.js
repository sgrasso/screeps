'use strict';

const harvester = {

	/** @param {Creep} creep **/
	run: creep => {
	    creep.assign(FIND_SOURCES_ACTIVE);
	    console.log(creep.memory.assignment);
		if (creep.carry.energy < creep.carryCapacity) {
		    if (creep.harvest(Game.getObjectById(creep.memory.assignment), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.getObjectById(creep.memory.assignment));
			}
// 			creep.harvestNearestResource();
            
		} else {

			let targets = creep.room.find(FIND_STRUCTURES, {
				filter: structure => (structure.structureType === STRUCTURE_TOWER && (structure.energy / structure.energyCapacity) < 0.2)
			});

			if (!targets.length){
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: structure => {
						return (structure.structureType === STRUCTURE_EXTENSION ||
								structure.structureType === STRUCTURE_SPAWN) && 
								structure.energy < structure.energyCapacity;
					}
				});
			}

			if (targets.length) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			} else {
				creep.say('waiting');
				creep.moveTo(Game.flags[creep.memory.rallyFlag]);
			}
		}
	}
};

module.exports = harvester;