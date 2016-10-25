'use strict';

Creep.prototype.harvestNearestResource = function() {
	if (this.memory.containers){
		const con = this.room.find(FIND_STRUCTURES, {
			filter: structure => {
				return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
			}
		});
		if (con.length){
			if (this.withdraw(con[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
				this.moveTo(con[0]);
			}
			return;
		}
	}
	const source = this.room.find(FIND_SOURCES);
	if (this.harvest(source[0]) === ERR_NOT_IN_RANGE) {
		this.moveTo(source[0]);
	}
};

Creep.prototype.buildRoads = function() {

	const start = Game.flags['buildStart'];
	const end = Game.flags['buildEnd'];

	if (!this.memory.working && start != null && !this.pos.inRangeTo(start.pos, 1)){
		this.moveTo(start.pos);
	} else {
		this.memory.working = true;
	}

	if (this.memory.working && this.memory.working != null && end != null){

		const path = this.room.findPath(start.pos, end.pos, { ignoreCreeps: true});

		if(path.length) {
			for (const i in path) {
				if (this.pos.inRangeTo(path[i].x, path[i].y, 1)){
					this.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
				} else {
					this.moveTo(path[i].x, path[i].y);
				}
			}
		}
	}
}