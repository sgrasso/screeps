'use strict';

const spawn = {

	generate: function(roles) {

		for (const n in roles){
			const creepers = _.filter(Game.creeps, (creep) => creep.memory.role == n);
			if (creepers.length < roles[n].min) {
				const name = Game.spawns['Radix'].createCreep(
					roles[n].body, 
					undefined, 
					{
						role: n,
						working: false,
						containers: roles[n].preferContainer,
						flag: (roles[n].flag) ? roles[n].flag : '',
						rallyFlag: (roles[n].rallyFlag) ? roles[n].rallyFlag : 'rally1'
						}
				);
				if (name !== ERR_NOT_ENOUGH_ENERGY && name !== ERR_BUSY){
					console.log(`Created ${name} with role ${n}`);
					return true;
				}
			}
		}
		return false;
	}
};

module.exports = spawn;