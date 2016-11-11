'use strict';

const gravedigger = {

	bury: () => {
		for (const name in Memory.creeps) {
			if (!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('Clearing non-existing creep memory:', name);
				return true;
			}
		}
		return false;
	}
};

module.exports = gravedigger;