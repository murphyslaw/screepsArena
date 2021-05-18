'use strict'

import FleeStrategy from '/user/strategies/fleeStrategy.mjs'

class StayOutOfHarm extends FleeStrategy {
    get meleeHitsPercentage() {
        return 1
    }

    get rangedHitsPercentage() {
        return 0.75
    }
}

export default StayOutOfHarm
