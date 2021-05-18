'use strict'

import {
    TOWER_OPTIMAL_RANGE,
    TOWER_RANGE,
} from '/game/constants'

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

import {
    StructureTower,
} from '/game/prototypes';

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
    const enemiesInRange = arena.enemyCreeps
        .filter(i => getRange(i, this) <= attackRange && i.canMove)
        .sort((a, b) => a.hits - b.hits)

    if (enemiesInRange.length > 0) {
        let target = enemiesInRange[0]

        this.attack(target)

        return
    }

    const healRange = TOWER_RANGE;
    const healTargets = arena.myCreeps
        .filter(i => i.isWounded && getRange(i, this) <= healRange)
        .sort((a, b) => a.hits - b.hits)

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
