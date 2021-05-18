'use strict'

class Bridge {
    constructor(position) {
        this.x = position.x
        this.y = position.y
    }

    toString() {
        return `[${this.constructor.name}] ${this.x}, ${this.y}`
    }
}

export default Bridge
