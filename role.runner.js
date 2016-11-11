'use strict';

const runner = {

	/** @param {Creep} creep **/
	run: creep => {

		
		if (_.sum(creep.carry) < creep.carryCapacity){
			if (creep.withdraw(creep.memory.assignment, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
				creep.moveTo(creep.memory.assignment, {reusePath: 20, serializeMemory: true});
			}
		} else {
			//offload
			

			// creep.harvestNearestResource();
		}
	}
};

module.exports = runner;