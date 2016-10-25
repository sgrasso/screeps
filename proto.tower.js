'use strict';

function repairMostDamagedStructure(room, validate, tower, max) {
	let structures = room.find(FIND_STRUCTURES, {
		filter: structure => {
			max = max || structure.hitsMax;
			return validate(structure.structureType) && structure.hits < max;
		}
	});
	if (structures.length === 0)
		return;
	structures = _.sortBy(structures, structure => structure.hits);
	tower.repair(structures[0]);
	return true;
}

StructureTower.prototype.attackHostileCreep = function () {
	const target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if (target) {
		this.attack(target);
		return true;
	}
};

StructureTower.prototype.repairStructure = function (max) {
	return repairMostDamagedStructure(
		this.room,
		structureType => [STRUCTURE_RAMPART, STRUCTURE_WALL].indexOf(structureType) === -1 && [STRUCTURE_CONTAINER].indexOf(structureType) !== -1, this, max
	);
};

StructureTower.prototype.repairWall = function (max) {
	max = max || 0;
	return repairMostDamagedStructure(
		this.room,
		structureType => [STRUCTURE_RAMPART, STRUCTURE_WALL].indexOf(structureType) !== -1, this, max
	);
};

StructureTower.prototype.rescueRampart = function (max) {
	max = max || 0;
	let structures = this.room.find(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_RAMPART && structure.hits <= RAMPART_DECAY_AMOUNT && structure.hits < max
	});
	if (structures.length === 0)
		return;
	this.repair(structures[0]);
	return true;
};