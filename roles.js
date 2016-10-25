'use strict';

/**
 * Contains functions needed for automatically spawning creeps.
 * @memberOf spawner
 * @module spawner.roles
 */
const roles = {
	harvester: {
		min: 2,
		body: [MOVE,WORK,WORK,CARRY],
		// priority: [STRUCTURE_SPAWN, STRUCTURE_TOWER, STRUCTURE_EXTENSION],
		preferContainer: false,
		rallyFlag: 'rally1'
	},
	remoteHarvester: {
		min: 0,
		body: [MOVE,MOVE,WORK,CARRY,CARRY],
		// priority: [STRUCTURE_EXTENSION, STRUCTURE_CONTAINER],
		preferContainer: false,
		flag: 'remote_energy',
		rallyFlag: 'rally1'
	},
	upgrader: {
		min: 2,
		body: [MOVE,WORK,WORK,CARRY],
		preferContainer: true,
		rallyFlag: 'rally1'
	},
	guard: {
		min: 1,
		body: [TOUGH, MOVE, ATTACK, ATTACK],
		preferContainer: false,
		rallyFlag: 'rally2'
	},
	handyman: {
		min: 2,
		body: [MOVE,WORK,WORK,CARRY],
		preferContainer: false,
		rallyFlag: 'rally1'
	},
	foreman: {
		min: 2,
		body: [MOVE,WORK,WORK,CARRY],
		preferContainer: false,
		rallyFlag: 'rally1'
	},
	claimer: {
		min: 0,
		body: [MOVE,CLAIM],
		preferContainer: false,
		flag: 'remote_controller'
	},
	paver: {
		min: 0,
		body: [MOVE,MOVE,MOVE,WORK],
		preferContainer: false
	},
	runner: {
		min: 0,
		body: [CARRY, CARRY, MOVE, MOVE],
		// priority: [],
		container: true
	}
};

module.exports = roles;