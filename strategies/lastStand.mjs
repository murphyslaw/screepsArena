'use strict'

import FleeStrategy from '/user/strategies/fleeStrategy'

class LastStand extends FleeStrategy {
    get meleeHitsPercentage() {
        return 0.25
    }

    get rangedHitsPercentage() {
        return 0
    }
}

export default LastStand
