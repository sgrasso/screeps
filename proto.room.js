'use strict';

Room.prototype.assignSources = function() {
	const sources = this.room.find(FIND_SOURCES_ACTIVE);
	for (let i = 0; i < sources.length; i++) {
		let harvester = sources[i].findClosestHarvester();
	}
	if (this.harvest(this.memory.source) === ERR_NOT_IN_RANGE) {
		this.moveTo(this.memory.source, {reusePath: 50, serializeMemory: true});
	}
};

Room.prototype.assignRunners = function() {
	const sources = this.room.find(FIND_SOURCES_ACTIVE);
	for (let i = 0; i < sources.length; i++) {
		let harvester = sources[i].findClosestHarvester();
	}
	if (this.harvest(this.memory.source) === ERR_NOT_IN_RANGE) {
		this.moveTo(this.memory.source, {reusePath: 50, serializeMemory: true});
	}
};