'use strict';

// Globals
require('global');

// Prototypes
require('proto.creep');
require('proto.tower');

// Role Management
const role = {
	harvester: require('role.harvester'),
	remoteHarvester: require('role.remote.harvester'),
	upgrader: require('role.upgrader'),
	handyman: require('role.handyman'),
	foreman: require('role.foreman'),
	guard: require('role.guard')
	// runner: require('role.runner')
	// claimer: require('role.claimer'),
	// paver: require('role.paver')
};
const roles = require('roles');

// Creep Management
const gravedigger = require('gravedigger');

// Spawn Management
const spawn = require('room.spawn');

// Controller Management
const towerController = require('controller.tower');

module.exports.loop = function () {

	if (ticksToWait(10)) {
		gravedigger.bury();
		spawn.generate(roles);
	}

	_.each(Game.rooms, room => {
		if (room.controller && room.controller.my){
			towerController.initRoom(room);
		}
	});

	for (const name in Game.creeps) {
		const creep = Game.creeps[name];
		role[creep.memory.role].run(creep);
	}
}