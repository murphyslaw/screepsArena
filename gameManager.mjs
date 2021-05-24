'use strict'

import * as constants from '/game/constants'

import _ from '/user/lodash-es/lodash'

import Arena from '/user/arena'
import Stats from '/user/stats'
import TickCache from '/user/utils/tickCache'
import Sandbox from '/user/utils/sandbox'

class GameManager {
    constructor() {
        for (const globalKey in constants) {
            global[globalKey] = constants[globalKey]
        }

        global._ = _

        this.components = [
            TickCache,
            Arena,
            Arena.strategy,
            Stats,
            Sandbox,
        ]
    }

    get isFirstTick() {
        return Arena.time === 1
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
