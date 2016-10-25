'use strict';

const foreman = {

	/** @param {Creep} creep **/
	run: creep => {
		let targets = null;

		if ((creep.memory.working || creep.memory.working == null) && creep.carry.energy === 0) {
			creep.memory.working = false;
		} 
		if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
			creep.memory.working = true;
		}
		
		targets = (creep.memory.working) ? creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES) : creep.room.find(FIND_SOURCES)[0];

		if (targets != null) {
			if (creep.memory.working) {
				if (creep.build(targets) === ERR_NOT_IN_RANGE)
					creep.moveTo(targets);
			} else {
				creep.harvestNearestResource();
			}
		} else {
			creep.say('waiting');
			creep.moveTo(Game.flags[creep.memory.rallyFlag]);
		}
	}
};

module.exports = foreman;