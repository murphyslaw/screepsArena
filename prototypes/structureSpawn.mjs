'use strict'

import { StructureSpawn } from '/game/prototypes'

const prototype = StructureSpawn.prototype

prototype.toString = function () {
    return `[${this.constructor.name}] ${this.x}, ${this.y}`
}

export default StructureSpawn
