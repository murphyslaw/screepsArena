'use strict'

import Arena from '/user/arena'
import Sorting from '/user/utils/sorting'
import Component from '/user/utils/component'

class FleeStrategy extends Component {
    constructor(creep) {
        super()

        this.creep = creep
        this.meleeHitsThreshold = Math.floor(creep.hitsMax * this.meleeHitsPercentage)
        this.rangedHitsThreshold = Math.floor(creep.hitsMax * this.rangedHitsPercentage)
    }

    get meleeHitsPercentage() {
        throw "Not implemented"
    }

    get rangedHitsPercentage() {
        throw "Not implemented"
    }

    update() {
        const creep = this.creep

        let enemiesInRange = Arena.enemyCreeps
            .filter(i => i.canAttack && i.inRangeTo(creep, i.weapon.range))

        if (enemiesInRange.length === 0) return

        let fleeRange = 0

        const distances = enemiesInRange
            .sort(Sorting.byRangeTo(creep))
            .map(i => creep.getRangeTo(i))

        if (creep.hits <= this.meleeHitsThreshold) {
            fleeRange = 3
        }

        if (creep.hits <= this.rangedHitsThreshold) {
            fleeRange = distances[distances.length - 1] + 1
        }

        creep.flee(enemiesInRange, fleeRange)
    }
}

export default FleeStrategy
