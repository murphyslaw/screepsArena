'use strict'

import {
    getRange
} from '/game/utils'

import Group from '/user/group.mjs'
import HealStrategy from '/user/strategies/healStrategy.mjs'
import AttackStrategy from '/user/strategies/attackStrategy.mjs'
import MovementStrategy from '/user/strategies/movementStrategy.mjs'
import MoveToGoal from '/user/strategies/moveToGoal.mjs'
import StayOutOfHarm from '/user/strategies/stayOutOfHarm.mjs'
import LastStand from '/user/strategies/lastStand.mjs'

class CaptureTheFlagBasic {
    static DELAY = 150

    constructor() {
        this.groups = []
        this.capturePoints = []
    }

    get currentCapturePoint() {
        return this.capturePoints[0]
    }

    targetDefinition(group) {
        const attackTarget = this.findTarget(group)
        const healTarget = group.wounded[0]

        const targetDefinition = {
            'Melee': attackTarget,
            'Ranged': attackTarget,
            'Healer': healTarget,
        }

        return targetDefinition
    }

    goalDefinition(group) {
        const team = group.team
        let goalDefinition

        if (team === 'defenders') {
            goalDefinition = {
                'Melee': arena.myFlag,
                'Ranged': arena.myFlag,
                'Healer': arena.myCornerPosition,
            }
        }

        if (team === 'attackers') {
            if (arena.time <= CaptureTheFlagBasic.DELAY) {
                goalDefinition = {
                    'Melee': arena.myTower,
                    'Ranged': arena.myTower,
                    'Healer': arena.myTower,
                }
            } else {
                goalDefinition = {
                    'Melee': this.currentCapturePoint,
                    'Ranged': this.currentCapturePoint,
                    'Healer': this.currentCapturePoint,
                }
            }
        }

        return goalDefinition
    }

    alertRange(group) {
        const team = group.team
        let alertRange

        if (team === 'defenders') {
            alertRange = 10
        } else if (team === 'attackers') {
            alertRange = arena.time <= CaptureTheFlagBasic.DELAY ? 10 : 20
        }

        return alertRange
    }

    start() {
        this.capturePoints = [
            arena.bridges[_.random(arena.bridges.length - 1)],
            arena.enemyFlag,
        ]

        console.log('Current Capture Point', this.currentCapturePoint)

        const defenders = new Group('defenders')
        const attackers = new Group('attackers')

        for (const creep of arena.myCreeps) {
            let components

            if (creep.isMelee) {
                attackers.add(creep)

                components = [
                    new AttackStrategy(creep),
                    new MovementStrategy(creep),
                    new LastStand(creep),
                ]
            }

            if (creep.isRanged) {
                if (defenders.members.length === 0) {
                    defenders.add(creep)

                    components = [
                        new AttackStrategy(creep),
                        new MoveToGoal(creep),
                        new StayOutOfHarm(creep),
                    ]
                } else {
                    attackers.add(creep)

                    components = [
                        new AttackStrategy(creep),
                        new MovementStrategy(creep),
                        new StayOutOfHarm(creep),
                    ]
                }


            }

            if (creep.isHealer) {
                attackers.add(creep)

                components = [
                    new HealStrategy(creep),
                    new MovementStrategy(creep),
                    new StayOutOfHarm(creep),
                ]
            }

            creep.start(components)
        }

        this.groups.push(defenders, attackers)

        arena.myTower.start()
    }

    findTarget(group) {
        const position = group.leader
        const alertRange = this.alertRange(group)
        const enemies = arena.enemyCreeps
            .filter(i => i.inRangeTo(position, alertRange))
            .sort((a, b) => a.hits == b.hits ? getRange(a, position) - getRange(b, position) : a.hits - b.hits)

        if (enemies.length === 0) return null

        return enemies[0]
    }

    update() {
        for (const group of this.groups) {
            if (group.team === 'attackers' && group.positionReached(this.currentCapturePoint)) {
                this.capturePoints.shift()

                console.log('Current Capture Point', this.currentCapturePoint)
            }

            group.alertRange = this.alertRange(group)
            group.targetDefinition = this.targetDefinition(group)
            group.goalDefinition = this.goalDefinition(group)

            group.update()
        }

        const tower = arena.myTower
        if (tower) tower.update()
    }
}

export default CaptureTheFlagBasic
