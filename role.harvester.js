'use strict';

const harvester = {

	/** @param {Creep} creep **/
	run: creep => {
		if (creep.carry.energy < creep.carryCapacity) {
			creep.harvestNearestResource();
		}
		else {

			const tower = Game.getObjectById('5805a2f1c364e9ff3aac2e5f'); //TODO: fix this and take it out.
			let targets = [];

			if ((tower.energy / tower.energyCapacity) < 0.25){
				targets.push(tower);
			} else {

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
			} else if (tower.energy < tower.energyCapacity){
				if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(tower);
				}
			} else {
				creep.say('waiting');
				creep.moveTo(Game.flags[creep.memory.rallyFlag]);
			}
		}
	}
};

module.exports = harvester;