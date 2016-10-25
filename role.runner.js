'use strict';

const runner = {

	/** @param {Creep} creep **/
	run: creep => {
		let targets = null;

		if ((creep.memory.working || creep.memory.working == null) && creep.carry.energy === 0) {
			creep.memory.working = false;
		} 
		if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
			creep.memory.working = true;
		}
		
		if (creep.memory.working) {
		
		} else {

			creep.harvestNearestResource();
		}
	}
};

module.exports = runner;