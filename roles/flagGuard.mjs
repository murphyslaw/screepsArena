'use strict'

class FlagGuard {
    constructor(creep) {
        this.creep = creep
    }

    start() {
        this.flag = arena.myFlag
    }

    get targets() {
        const enemyCreeps = arena.enemyCreeps
        const creep = this.creep
        const alertRange = 1
        const flag = this.flag

        const targets = enemyCreeps
            .filter(i => i.inRangeTo(creep, alertRange))
            .sort(Sorting.byRangeTo(flag))

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
