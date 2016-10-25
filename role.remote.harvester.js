'use strict';

const remoteHarvester = {

	/** @param {Creep} creep **/
	run: creep => {
		if (creep.carry.energy < creep.carryCapacity) {
			const flag = Game.flags[creep.memory.flag]; //TODO: indexOf string match.

			if (!creep.pos.inRangeTo(flag, 1) && !isPosEqual(creep.pos, flag.pos)){
				creep.moveTo(flag);
			} else {
				creep.harvestNearestResource();
			}
		}
		else {
			const targets = Game.spawns.Radix.room.find(FIND_STRUCTURES, {
				filter: structure => (structure.structureType === STRUCTURE_CONTAINER &&  _.sum(structure.store) < structure.storeCapacity) ||
									(structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity)
			});
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

module.exports = remoteHarvester;