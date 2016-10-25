let guard = {

	run: function(creep){

		let targets = creep.room.find(FIND_HOSTILE_CREEPS);

		if (targets.length) {
			creep.moveTo(targets[0]);
			creep.attack(targets[0]);
		}
		else {
			creep.moveTo(Game.flags[creep.memory.rallyFlag]);
		}
	}
};

module.exports = guard;
