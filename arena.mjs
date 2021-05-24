'use strict'

import { arenaInfo } from '/game'

import CaptureTheFlagArena from '/user/arenas/captureTheFlagArena'
import SpawnAndSwampArena from '/user/arenas/spawnAndSwampArena'

let Arena

switch (arenaInfo.name) {
    case 'Capture the Flag':
        Arena = CaptureTheFlagArena
        break

    case 'Spawn and Swamp':
        Arena = SpawnAndSwampArena
        break

    default:
        throw `unsupported arena: ${arenaInfo.name}`
}

export default new Arena()
