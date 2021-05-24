'use strict'

import {
    getRange
} from '/game/utils'

import Arena from '/user/arena'
import Group from '/user/group'
import HealStrategy from '/user/strategies/healStrategy'
import AttackStrategy from '/user/strategies/attackStrategy'
import MovementStrategy from '/user/strategies/movementStrategy'
import MoveToGoal from '/user/strategies/moveToGoal'
import StayOutOfHarm from '/user/strategies/stayOutOfHarm'
import LastStand from '/user/strategies/lastStand'

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
                'Melee': Arena.myFlag,
                'Ranged': Arena.myFlag,
                'Healer': Arena.myCornerPosition,
            }
        }

        if (team === 'attackers') {
            if (Arena.time <= CaptureTheFlagBasic.DELAY) {
                goalDefinition = {
                    'Melee': Arena.myTower,
                    'Ranged': Arena.myTower,
                    'Healer': Arena.myTower,
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
            alertRange = Arena.time <= CaptureTheFlagBasic.DELAY ? 10 : 20
        }

        return alertRange
    }

    start() {
        this.capturePoints = [
            Arena.bridges[_.random(Arena.bridges.length - 1)],
            Arena.enemyFlag,
        ]

        console.log('Current Capture Point', this.currentCapturePoint)

        const defenders = new Group('defenders')
        const attackers = new Group('attackers')

        for (const creep of Arena.myCreeps) {
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

        Arena.myTower.start()
    }

    findTarget(group) {
        const position = group.leader
        const alertRange = this.alertRange(group)
        const enemies = Arena.enemyCreeps
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

        const tower = Arena.myTower
        if (tower) tower.update()
    }
}

export default CaptureTheFlagBasic
