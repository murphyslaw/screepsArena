'use strict'

import Component from '/user/utils/component'

class MoveToGoal extends Component {
    constructor(creep) {
        super()

        this.creep = creep
    }

    update() {
        const creep = this.creep
        const goal = creep.goal

        if (goal) {
            creep.moveTo(goal)
        }
    }
}

export default MoveToGoal
