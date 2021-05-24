'use strict'

import { RoomObject } from '/game/prototypes'

const prototype = RoomObject.prototype

prototype.toString = function () {
    return `[${this.constructor.name}] ${this.x}, ${this.y}`
}

export default RoomObject
