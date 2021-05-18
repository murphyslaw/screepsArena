'use strict'

import * as constants from '/game/constants'

import _ from '/user/lodash-es/lodash'

// import Arena from '/user/arenas/captureTheFlagArena.mjs'
import Arena from `/user/arenas/spawnAndSwampArena.mjs`

import RoomObject from '/user/prototypes/roomObject.mjs'
import Stats from '/user/stats.mjs'
import TickCache from '/user/utils/tickCache.mjs'
import Sandbox from '/user/utils/sandbox.mjs'

class GameManager {
    constructor() {
        for (const globalKey in constants) {
            global[globalKey] = constants[globalKey]
        }

        global._ = _
        global.tickCache = new TickCache()
        global.arena = new Arena()

        this.components = [
            global.tickCache,
            global.arena,
            global.arena.strategy,
            new Stats(),
            new Sandbox(),
        ]
    }

    get isFirstTick() {
        return arena.time === 1
    }

    loop() {
        if (this.isFirstTick) {
            for (const component of this.components) {
                if (typeof component.start === 'function') {
                    component.start()
                }
            }
        }

        for (const component of this.components) {
            if (typeof component.update === 'function') {
                component.update()
            }
        }
    }
}

export default (new GameManager())
