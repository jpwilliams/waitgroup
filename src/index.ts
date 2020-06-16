import { EventEmitter } from 'events'

/**
 * A WaitGroup waits for a collection of actions to finish.
 * The main goroutine calls `add` to set the number of actions to wait for.
 * Then each of the actions runs and calls `done` when finished.
 * At the same time, `wait` can be used to return a promise that resolves when all actions have finished.
 *
 * The class doesn't implement the race-condition requirements that the Golang package has due to the
 * way Node functions, meaning `add`, `done` and `wait` can be called at any time, in any order.
 */
export class WaitGroup {
	private _current = 0
	private _emitter = new EventEmitter()

	/**
	 * Adds a delta, which may be negative, to the WaitGroup counter.
	 * If the counter becomes zero, all promises returned from `wait` are resolved.
	 * If the counter goes negative, an error is thrown.
	 */
	public add (delta: number = 1): void {
		this._current += delta
		if (this._current < 0) throw new Error('Negative WaitGroup counter')
		if (this._current === 0) this._emitter.emit('done')
	}

	/**
	 * Decrements the WaitGroup counter by one.
	 */
	public done (): void {
		this.add(-1)
	}

	/**
	 * Returns a promise that resolves when the WaitGroup counter is zero.
	 * If the counter is zero when the method is called, it's resolved immediately.
	 */
	public wait (): Promise<void> {
		return new Promise((resolve) => {
			if (this._current === 0) return resolve()
			this._emitter.once('done', () => resolve())
		})
	}
}
