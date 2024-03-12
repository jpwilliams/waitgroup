/**
 * A {@link WaitGroup} waits for a collection of actions to finish. ~The main
 * goroutine calls~ You call {@link add} to set the number of actions to wait
 * for. Then each of the actions runs and calls {@link done} when finished. At
 * the same time, {@link wait} can be used to return a promise that resolves
 * when all actions have finished.
 *
 * The class doesn't implement the race-condition requirements that the Golang
 * package has due to the way JavaScript functions, meaning {@link add},
 * {@link done} and {@link wait} can be called at any time, in any order.
 */
export class WaitGroup {
	private current = 0
	private queued: (() => void)[] = []

	private queue (fn: () => void) {
		if (this.current === 0) {
			fn()
		} else {
			this.queued.push(fn)
		}
	}

	private resolveQueue () {
		while (this.queued.length > 0) {
			this.queued.shift()?.()
		}
	}

	/**
   * Adds a {@link delta}, which may be negative, to the {@link WaitGroup}'s
   * {@link current} counter.
   *
   * If the {@link current} counter becomes zero, all promises returned from
   * {@link wait} are resolved.
   *
   * If the {@link current} counter goes negative, an error is thrown.
   */
	public add (delta: number = 1): void {
		this.current += delta
		if (this.current < 0) throw new Error('Negative WaitGroup counter')
		if (this.current === 0) this.resolveQueue()
	}

	/**
   * Decrements the {@link WaitGroup}'s {@link current} counter by one.
   */
	public done (): void {
		this.add(-1)
	}

	/**
   * Returns a promise that resolves when the {@link WaitGroup}'s
   * {@link current} counter is zero. If the {@link current} counter is zero
   * when the method is called, it's resolved immediately.
   */
	public wait (): Promise<void> {
		return new Promise((resolve) => {
			this.queue(() => resolve())
		})
	}
}
