'use strict'

import {
    // getTime,
    // getObjectById,
    // getObjects,
    // getObjectsByPrototype,
    // getHeapStatistics,
    // findPath,
    // getDirection,
    getRange,
} from '/game/utils'

class FlagGuard {
    constructor(creep) {
        this.creep = creep
    }

    start() {
        this.flag = arena.myFlag

        console.log(this.creep)
    }

    get targets() {
        const enemyCreeps = arena.enemyCreeps
        const creep = this.creep
        const alertRange = 1
        const flag = this.flag

        const targets = enemyCreeps
            .filter(i => getRange(i, creep) <= alertRange)
            .sort((a, b) => getRange(a, flag) - getRange(b, flag))

        return targets
    }

    update() {
        const targets = this.targets
        const creep = this.creep
        const flag = this.flag

        if (targets.length > 0) {
            let target = targets[0]

            creep.attack(target)
        }
        else {
            creep.moveTo(flag)
        }
    }

    toString() {
        return this.constructor.name
    }
}

export default FlagGuard
