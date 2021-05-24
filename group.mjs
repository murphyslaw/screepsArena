'use strict'

import TickCache from '/user/utils/tickCache'
import Sorting from '/user/utils/sorting'

class Group {
    constructor(team) {
        this.team = team
        this.leader = null
        this._members = []
    }

    get members() {
        if (!TickCache.has(`members-${this.team}`)) {
            for (const creep of this._members) {
                if (creep.isDead) {
                    this.delete(creep)
                }
            }

            TickCache.add(`members-${this.team}`)
        }

        return this._members
    }

    get wounded() {
        const wounded = this.members
            .filter(i => i.isWounded)
            .sort(Sorting.byHits())

            return wounded
    }

    add(creep) {
        this._members.push(creep)
        creep.group = this

        if (!this.leader) {
            this.leader = creep
            console.log('leader', this.leader)
        }
    }

    delete(creep) {
        const index = this._members.indexOf(creep)

        if (index != -1) {
            this._members.splice(index, 1)
        }

        creep.group = null

        if (this.leader === creep) {
            this.leader = this._members[0]
            console.log('leader', this.leader)
        }
    }

    update() {
        const members = this.members

        if (members.length === 0) return

        const leader = this.leader
        const target = this.targetDefinition
        const goal = this.goalDefinition
        const alertRange = this.alertRange
        const isSpreadTooHigh = this.isSpreadTooHigh

        for (const creep of members) {
            creep.alertRange = alertRange
            creep.target = target[creep.role.toString()]

            if (creep.target) {
                // TODO: is this needed? why?
                creep.goal = creep.target
            } else if (isSpreadTooHigh) {
                if (!creep.inRangeTo(leader, 2)) {
                    creep.goal = leader
                } else {
                    creep.goal = creep
                }
            } else {
                creep.goal = goal[creep.role.toString()]
            }

            creep.update()
        }
    }

    get isSpreadTooHigh() {
        return this.spread > 8
    }

    get spread() {
        const leader = this.leader
        const sorted = this.members.sort(Sorting.byRangeTo(leader, Sorting.DESC))
        const range = leader.getRangeTo(sorted[0])

        return range
    }

    positionReached(position) {
        return this.members.some(i => i.standsOn(position))
    }
}

export default Group
