'use strict'

import {
    getObjectsByPrototype,
} from '/game/utils'

import {
    StructureSpawn,
} from '/game/prototypes'

import Arena from '/user/arenas/arena.mjs'
import SpawnAndSwampBasic from '/user/strategies/spawnAndSwampBasic.mjs'

class SpawnAndSwampArena extends Arena {
    get strategy() {
        return new SpawnAndSwampBasic()
    }

    get mySpawn() {
        return getObjectsByPrototype(StructureSpawn).find(i => i.my)
    }

    get enemySpawn() {
        return getObjectsByPrototype(StructureSpawn).find(i => !i.my)
    }
}

export default SpawnAndSwampArena
