'use strict'

import {
    getRange,
} from '/game/utils'

class Sorting {
    static DESC = -1
    static ASC = 1

    byRangeTo(position, direction = Sorting.ASC) {
        return (a, b) => (getRange(a, position) - getRange(b, position)) * direction
    }

    byHits(direction = Sorting.ASC) {
        return (a, b) => (a.hits - b.hits) * direction
    }
}

export default new Sorting()
