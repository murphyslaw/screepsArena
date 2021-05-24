'use strict'

import {
    getDirection,
} from '/game/utils'

import {
    searchPath,
} from '/game/path-finder'

import { Creep } from '/game/prototypes'

import HealerWeapon from '/user/weapons/healerWeapon'
import MeleeWeapon from '/user/weapons/meleeWeapon'
import RangedWeapon from '/user/weapons/rangedWeapon'

const prototype = Creep.prototype

Object.defineProperties(prototype, {
    'isDead': {
        get: function () {
            return !this.exists
        },
        configurable: true,
    },
    'isWounded': {
        get: function () {
            return this.hits < this.hitsMax
        },
        configurable: true,
    },
    'isMelee': {
        get: function () {
            return this.body.some(i => i.type === ATTACK)
        },
        configurable: true,
    },
    'isRanged': {
        get: function () {
            return this.body.some(i => i.type === RANGED_ATTACK)
        },
        configurable: true,
    },
    'isHealer': {
        get: function () {
            return this.body.some(i => i.type === HEAL)
        },
        configurable: true,
    },
    'canMove': {
        get: function () {
            return this.body.some(i => i.type === MOVE && i.hits > 0)
        },
        configurable: true,
    },
    'canAttack': {
        get: function () {
            return this.body.some(i => (i.type === ATTACK || i.type === RANGED_ATTACK) && i.hits > 0)
        },
        configurable: true,
    },
    'weapon': {
        get: function () {
            switch (true) {
                case this.isRanged:
                    return new RangedWeapon(this)
                case this.isMelee:
                    return new MeleeWeapon(this)
                case this.isHealer:
                    return new HealerWeapon(this)
            }
        },
        configurable: true,
    },
    'group': {
        get: function () {
            return this._group
        },
        set: function(value) {
            this._group = value
        },
        configurable: true,
    },
})

prototype.toString = function() {
    const faction = this.my ? 'friend' : 'enemy'
    return `[${this.constructor.name}:${faction}] ${this.x},${this.y}`
}

prototype.start = function(components) {
    this.components = components

    switch (true) {
        case this.isRanged:
            this.role = 'Ranged'
            break
        case this.isMelee:
            this.role = 'Melee'
            break
        case this.isHealer:
            this.role = 'Healer'
            break
    }

    for (const component of components) {
        component.start()
    }
}

prototype.update = function() {
    for (const component of this.components) {
        component.update()
    }
}

prototype.standsOn = function(position) {
    return position.x === this.x && position.y === this.y
}

prototype.inRangeTo = function(target, range) {
    return this.getRangeTo(target) <= range
}

prototype.flee = function(targets, range) {
    if (range <= 1) return

    let origin = this
    let goals = targets.map(i => ({ pos: i, range }))
    let options = {
        flee: true,
    }

    let result = searchPath(origin, goals, options)

    if (result.path.length > 0) {
        let direction = getDirection(result.path[0].x - this.x, result.path[0].y - this.y)

        this.move(direction)
    }
}

export default Creep
