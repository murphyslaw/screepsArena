'use strict'

import Arena from '/user/arena'

class Stats {
    constructor() {}

    get refreshTime() {
        return 10
    }

    get timeForOutput() {
        return Arena.time % this.refreshTime === 0
    }

    start() {}

    update() {
        if(this.timeForOutput) {
            console.log('friends', Arena.myCreeps.length)
            console.log('enemies', Arena.enemyCreeps.length)
        }
    }
}

export default new Stats()
