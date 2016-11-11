'use strict';

global.isPosEqual = (pos1, pos2) => {
	return (pos1.x === pos2.x && 
			pos1.y === pos2.y &&
	 pos1.roomName === pos2.roomName);
};

global.ticksToWait = ticks => {
	return Game.time % ticks === 0;
};

global.distance = function (room, structure_type) {
	let sources = room.find(FIND_SOURCES);
	let offloadPoints =  room.find(FIND_STRUCTURES, {
		filter: function(object) {
			return (object.structureType == STRUCTURE_SPAWN
					|| object.structureType == STRUCTURE_EXTENSION);
		}
	});
	let totalDistance= 0;
	let numRoutes = 0;
	for ( let i = 0 ; i < sources.length ; i++ ) {
		for ( let j = 0 ; j < offloadPoints.length ; j++ ) {
			totalDistance += sources[i].pos.findPathTo(offloadPoints[i]).length;
			numRoutes++;
		}
	}
	return totalDistance/numRoutes
};