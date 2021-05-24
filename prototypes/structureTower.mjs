'use strict'

import {
    TOWER_OPTIMAL_RANGE,
    TOWER_RANGE,
} from '/game/constants'

import { StructureTower } from '/game/prototypes'

import Arena from '/user/arena'
import Sorting from '/user/utils/sorting'

const prototype = StructureTower.prototype;

Object.defineProperties(prototype, {
    'isWounded': {
        get: function () {
            return this.hits < this.hitsMax
        },
        configurable: true,
    },
})

prototype.start = function () {}

prototype.update = function () {
    const attackRange = TOWER_OPTIMAL_RANGE + 5
    const enemiesInRange = Arena.enemyCreeps
        .filter(i => i.inRangeTo(this, attackRange) && i.canMove)
        .sort(Sorting.byHits())

    if (enemiesInRange.length > 0) {
        let target = enemiesInRange[0]

        this.attack(target)

        return
    }

    const healRange = TOWER_RANGE
    const healTargets = Arena.myCreeps
        .filter(i => i.isWounded && i.inRangeTo(this, healRange))
        .sort(Sorting.byHits())

    if (healTargets.length > 0) {
        let target = healTargets[0]

        this.heal(target)

        return
    }
}

prototype.toString = function () {
    return `[${this.constructor.name}] ${this.x}, ${this.y}`
}

export default StructureTower
