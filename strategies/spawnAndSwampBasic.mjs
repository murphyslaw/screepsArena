'use strict'

class SpawnAndSwampBasic {
    constructor() {}

    start() {
        this.attacker = arena.mySpawn.spawnCreep([MOVE, ATTACK])
        this.enemySpawn = arena.enemySpawn
    }

    update() {
        const attacker = this.attacker
        const enemySpawn = this.enemySpawn

        attacker.moveTo(enemySpawn)
        attacker.attack(enemySpawn)
    }
}

export default SpawnAndSwampBasic
