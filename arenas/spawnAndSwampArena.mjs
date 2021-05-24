'use strict'

import { getObjectsByPrototype } from '/game/utils'

import Arena from '/user/arenas/arena'
import SpawnAndSwampBasic from '/user/strategies/spawnAndSwampBasic'
import StructureSpawn from '/user/prototypes/structureSpawn'

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
