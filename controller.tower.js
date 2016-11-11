'use strict';

const towers = {

	initRoom: (room) => {
		const structures = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_TOWER });
		_.each(structures, structure => towers.run(structure));
	},

	/** @param {Creep} creep **/
	run: (tower) => {
		//TODO: Is Tower Empty check.
		if (tower.attackHostileCreep())
			return;
		if (tower.repairRampart(20000))
			return;
		if (tower.repairStructure(130000))
			return;
		if (tower.repairWall())
			return;
	}
};

module.exports = towers;