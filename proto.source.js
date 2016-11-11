'use strict';

Source.prototype.findClosestHarvester = function(opts) {
    return this.pos.findClosestByRange(FIND_MY_CREEPS, 
		{filter: {memory: {role: 'harvester'}}});
};