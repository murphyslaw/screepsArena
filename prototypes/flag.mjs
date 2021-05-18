'use strict'

import {
    Flag,
    // BodyPart,
} from '/arena'

const prototype = Flag.prototype

prototype.toString = function () {
    return `[${this.constructor.name}] ${this.x}, ${this.y}`
}

export default Flag
