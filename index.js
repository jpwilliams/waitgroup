const { EventEmitter } = require('events')

class WaitGroup {
	constructor () {
		this._current = 0
		this._emitter = new EventEmitter()
	}

	add (delta = 1) {
		this._current += delta
		if (this._current < 0) throw new Error('Negative WaitGroup counter')
		if (this._current === 0) this._emitter.emit('done')
	}

	done () {
		this.add(-1)
	}

	wait () {
		return new Promise((resolve) => {
			if (this._current === 0) return resolve()
			this._emitter.once('done', () => resolve())
		})
	}
}

module.exports = WaitGroup
