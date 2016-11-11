'use strict';

const upgrader = {

	/** @param {Creep} creep **/
	run: creep => {

		creep.workStatus();

		if(creep.memory.working) {
			if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {reusePath: 6, serializeMemory: true});
			}
		}
		else {
			creep.harvestNearestResource();
		}
	}
};

module.exports = upgrader;