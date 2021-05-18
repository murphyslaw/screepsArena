'use strict'

class Stats {
    constructor() {}

    get refreshTime() {
        return 10;
    }

    get timeForOutput() {
        return arena.time % this.refreshTime === 0
    }

    start() {}

    update() {
        if(this.timeForOutput) {
            console.log('friends', arena.myCreeps.length)
            console.log('enemies', arena.enemyCreeps.length)
        }
    }
}

export default Stats
