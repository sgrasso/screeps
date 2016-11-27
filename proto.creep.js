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
				this.moveTo(con[0], {reusePath: 20, serializeMemory: true});
			}
			return;
		}
	}
	const source = this.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
	if (this.harvest(source) === ERR_NOT_IN_RANGE) {
		this.moveTo(source, {reusePath: 50, serializeMemory: true});
	}
};

Creep.prototype.workStatus = function() {
	if ((this.memory.working || this.memory.working == null) && this.carry.energy === 0) {
		this.memory.working = false;
	} 
	if (!this.memory.working && this.carry.energy === this.carryCapacity) {
		this.memory.working = true;
	}
};

Creep.prototype.assign = function(obj) {
    if (!this.memory.assignment){
        const targets = this.room.find(obj);
        for (let i = 0; i < targets.length; i++) {
            if (!this.room.memory[targets[i].id] || !Game.getObjectById(targets[i].id)){
    		    this.memory.assignment = targets[i].id;
    		    this.room.memory[targets[i].id] = this.id;
    		    return true;
    		}
    	}
    }
    return true;
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