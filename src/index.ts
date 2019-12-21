import { EventEmitter } from 'events'

class WaitGroup {
	_current: number
	_emitter: EventEmitter

	constructor () {
		this._current = 0
		this._emitter = new EventEmitter()
	}

	add (delta: number = 1): void {
		this._current += delta
		if (this._current < 0) throw new Error('Negative WaitGroup counter')
		if (this._current === 0) this._emitter.emit('done')
	}

	done (): void {
		this.add(-1)
	}

	wait (): Promise<void> {
		return new Promise((resolve) => {
			if (this._current === 0) return resolve()
			this._emitter.once('done', () => resolve())
		})
	}
}

export {
	WaitGroup
}
