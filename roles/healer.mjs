'use strict'

import HealStrategy from '/user/strategies/healStrategy.mjs'
import MovementStrategy from '/user/strategies/movementStrategy.mjs'
import StayOutOfHarm from '/user/strategies/stayOutOfHarm.mjs'

class Healer {
    constructor(creep) {
        this.creep = creep

        this.strategies = [
            new HealStrategy(creep),
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

export default Healer
