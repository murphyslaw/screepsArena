'use strict'

import { getObjectsByPrototype } from '/game/utils'
import * as arena from '/arena'

import Arena from '/user/arenas/arena'
import CaptureTheFlagBasic from '/user/strategies/captureTheFlagBasic'
import Bridge from '/user/bridge'

class CaptureTheFlagArena extends Arena {
    get strategy() {
        return new CaptureTheFlagBasic()
    }

    get bridges() {
        if (!this._brigdes) {
            this._bridges = [
                new Bridge({ x: 35, y: 65 }),
                new Bridge({ x: 65, y: 35 }),
            ]
        }

        return this._bridges
    }

    get flags() {
        return getObjectsByPrototype(arena.Flag)
    }

    get myFlag() {
        return this.flags.find(i => i.my)
    }

    get enemyFlag() {
        return this.flags.find(i => !i.my)
    }

    get myTowers() {
        return this.towers.filter(i => i.my)
    }

    get enemyTower() {
        return this.towers.find(i => !i.my)
    }

    get myCornerPosition() {
        return this.cornerPosition(this.myFlag)
    }

    cornerPosition(flag) {
        let position = { x: 1, y: 1 }

        if (flag.x !== 2) {
            position = { x: 98, y: 98 }
        }

        return position;
    }
}

export default CaptureTheFlagArena
