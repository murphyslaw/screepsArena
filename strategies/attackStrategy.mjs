'use strict'

import Arena from '/user/arena'
import Sorting from '/user/utils/sorting'
import Component from '/user/utils/component'

class AttackStrategy extends Component {
    constructor(creep) {
        super()

        this.creep = creep
    }

    update() {
        const creep = this.creep
        const weapon = creep.weapon

        let enemiesInRange = Arena.enemyCreeps
            .filter(i => creep.inRangeTo(i, weapon.range))

        const numberOfEnemiesInRange = enemiesInRange.length

        // when no enemies are in range, than the target is not in range either
        if (numberOfEnemiesInRange === 0) return

        let target = creep.target

        // attack the closest enemy in range in case the creep has no target
        // or the target is not in range
        if (!target || !enemiesInRange.includes(target)) {
            enemiesInRange = enemiesInRange
                .sort(Sorting.byRangeTo(creep))

            target = enemiesInRange[0]
        }

        weapon.attack(target, numberOfEnemiesInRange)
    }
}

export default AttackStrategy
