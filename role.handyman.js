'use strict';

const handyman = {

	/** @param {Creep} creep **/
	/* TODO: Remove hardcoded values */
	run: creep => {

		creep.workStatus();
		
		if (creep.memory.working){

			let targets = [];
			let structures = creep.room.find(FIND_STRUCTURES);

			for (let i = 0, structLen = structures.length; i < structLen; i++) {
				let structure = structures[i];
			
				if(structure.structureType === STRUCTURE_RAMPART && structure.hits < 20000){ //(structure.hitsMax - 50)
					targets.push(structure);
				} else if (structure.structureType === STRUCTURE_WALL && structure.hits < 20000){
					targets.push(structure);
				}

				if ((structure.hits / structure.hitsMax) < 0.2 && 
					structure.structureType !== STRUCTURE_RAMPART && 
					structure.structureType !== STRUCTURE_WALL) {
						targets.push(structure);
				} else if ((structure.hits / structure.hitsMax) < 0.5 && 
					structure.structureType !== STRUCTURE_RAMPART && 
					structure.structureType !== STRUCTURE_WALL &&
					structure.structureType === STRUCTURE_ROAD) {
						targets.push(structure);
				} else if (structure.hits < structure.hitsMax){
						targets.push(structure)
				}
			}

			if (targets.length){
				targets.sort((a, b) => {
					return((a.hits / a.hitsMax) - (b.hits / b.hitsMax));
				});
				if (creep.memory.working) {
					if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE)
						creep.moveTo(targets[0]);
				} else {
					creep.harvestNearestResource();
				}

			} else {
				creep.say('waiting');
				creep.moveTo(Game.flags[creep.memory.rallyFlag]);
			}
			
		} else {
			creep.harvestNearestResource();
		}
	}
};

module.exports = handyman;