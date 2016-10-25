'use strict';

const claimer = {

	/** @param {Creep} creep **/
	run: creep => {
		const flag = Game.flags[creep.memory.flag]; //TODO: indexOf string match.

		if (!isPosEqual(creep.pos, flag.pos) && !creep.pos.inRangeTo(flag, 1)){
			creep.moveTo(flag);
		} else if (creep.claimController(creep.room.controller) !== OK){
				creep.reserveController(creep.room.controller);
		} else {
			creep.moveTo(Game.flags[creep.memory.rallyflag]);
		}
	}
};

module.exports = claimer;