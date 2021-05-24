'use strict'

class TickCache {
    constructor() {
        this.cache = new Set()
    }

    has(cacheKey) {
        this.cache.has(cacheKey)
    }

    add(cacheKey) {
        this.cache.add(cacheKey)
    }

    update() {
        this.cache.clear()
    }
}

export default new TickCache()
