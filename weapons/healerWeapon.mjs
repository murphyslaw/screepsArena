'use strict'

class HealerWeapon {
    constructor(creep) {
        this.creep = creep
    }

    get range() {
        return 3
    }

    // depending on the range to the target, either use heal or ranged heal
    heal(target) {
        const creep = this.creep

        if (creep.inRangeTo(target, 1)) {
            creep.heal(target)
        } else {
            creep.rangedHeal(target)
        }
    }
}

export default HealerWeapon
