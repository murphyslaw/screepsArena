'use strict'

import { arenaInfo } from '/game'
import { getTicks, getObjectsByPrototype } from '/game/utils'

import Creep from '/user/prototypes/creep'
import StructureTower from '/user/prototypes/structureTower'

class Arena {
    get time() {
        return getTicks()
    }

    get name() {
        return arenaInfo.name
    }

    get level() {
        let mode = 'unknown'

        switch (arenaInfo.level) {
            case 1:
                mode = 'basic'
                break

            case 2:
                mode = 'advanced'
                break
        }

        return mode
    }

    get season() {
        return arenaInfo.season
    }

    get strategy() {
        throw 'Not implemented'
    }

    get towers() {
        return getObjectsByPrototype(StructureTower)
    }

    get creeps() {
        return getObjectsByPrototype(Creep)
    }

    get myCreeps() {
        return this.creeps.filter(i => i.my)
    }

    get enemyCreeps() {
        return this.creeps.filter(i => !i.my)
    }

    start() {}

    update() {}

    toString() {
        return `${this.name} (${this.level}, ${this.season})`
    }
}

export default Arena
