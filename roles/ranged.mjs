'use strict'

import AttackStrategy from '/user/strategies/attackStrategy.mjs'
import MovementStrategy from '/user/strategies/movementStrategy.mjs'
import StayOutOfHarm from '/user/strategies/stayOutOfHarm.mjs'

class Ranged {
    constructor(creep) {
        this.creep = creep

        this.strategies = [
            new AttackStrategy(creep),
            new MovementStrategy(creep),
            new StayOutOfHarm(creep),
        ]
    }

    start() {}

    update() {
        for (const strategy of this.strategies) {
            strategy.apply()
        }
    }

    toString() {
        return this.constructor.name
    }
}

export default Ranged
