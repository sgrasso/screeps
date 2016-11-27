'use strict';

const foreman = {

	/** @param {Creep} creep **/
	run: creep => {
	    
		creep.workStatus();
		
        let priorities = ['STRUCTURE_TOWER','STRUCTURE_RAMPART','STRUCTURE_EXTENSION'];
        
		let targets = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
		// let targets = creep.pos.find(FIND_MY_CONSTRUCTION_SITES);

		// targets = _.sortBy(structures,
		// 	structure => {
		// 		const creeps = creep.room.find(FIND_MY_CREEPS, {
		// 			filter: creep => creep.memory.harvestSource === structure.id
		// 		});
		// 		return structure;
		// 	}
		// );

		if (targets != null) {

			if (creep.memory.working) {
				if (creep.build(targets) === ERR_NOT_IN_RANGE)
					creep.moveTo(targets);
			} else {
				// const source = Game.getObjectById('57ef9ca886f108ae6e60c9a0');
				// if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
				// 	creep.moveTo(source);
				// }
				creep.harvestNearestResource();
			}
		} else {
			creep.say('waiting');
			creep.moveTo(Game.flags[creep.memory.rallyFlag]);
		}
	}
};

module.exports = foreman;