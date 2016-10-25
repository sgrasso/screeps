'use strict';

const upgrader = {

	/** @param {Creep} creep **/
	run: creep => {

		if (creep.memory.working && creep.carry.energy === 0) {
			creep.memory.working = false;
		}
		if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
			creep.memory.working = true;
		}

		if(creep.memory.working) {
			if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		}
		else {
			creep.harvestNearestResource();
		}
	}
};

module.exports = upgrader;