'use strict'

import Arena from '/user/arena'

class SpawnAndSwampBasic {
    constructor() {}

    start() {
        this.attacker = Arena.mySpawn.spawnCreep([MOVE, ATTACK])
        this.enemySpawn = Arena.enemySpawn
    }

    update() {
        const attacker = this.attacker
        const enemySpawn = this.enemySpawn

        attacker.moveTo(enemySpawn)
        attacker.attack(enemySpawn)
    }
}

export default SpawnAndSwampBasic
