import { WaitGroup } from './'

describe('WaitGroup', () => {
	test('exports class constructor', () => {
		expect(typeof WaitGroup).toBe('function')
	})

	test('creates a class instance when run', () => {
		const wg = new WaitGroup()
		expect(wg).toBeInstanceOf(WaitGroup)
	})

	describe('wait()', () => {
		test('instantly returns if no actions taken yet', () => {
			const wg = new WaitGroup()
			const wait = wg.wait()

			return expect(wait).resolves.toEqual(undefined)
		})

		test('waits for internal counter to reach 0', async () => {
			const wg = new WaitGroup()
			let isResolved = false
			wg.add(2)

			const waiting = wg.wait().then(() => {
				isResolved = true
			})

			expect(isResolved).toEqual(false)

			wg.done()
			expect(isResolved).toEqual(false)

			wg.done()
			await expect(waiting).resolves.toEqual(undefined)
			expect(isResolved).toEqual(true)
		})
	})

	describe('add()', () => {
		test('increments internal counter by default of 1', () => {
			const wg = new WaitGroup()
			wg.add()
			expect(wg['_current']).toEqual(1)
		})

		test('increments internal counter given value', () => {
			const wg = new WaitGroup()
			wg.add(3)
			expect(wg['_current']).toEqual(3)
		})

		test('throws if add() results in a negative counter', () => {
			const wg = new WaitGroup()
			expect(wg.add.bind(wg, -1)).toThrow('Negative WaitGroup counter')
		})
	})

	describe('done()', () => {
		test('decrements internal counter by 1', () => {
			const wg = new WaitGroup()
			wg.add(3)
			expect(wg['_current']).toEqual(3)
			wg.done()
			expect(wg['_current']).toEqual(2)
		})

		test('throws if done() results in a negative counter', () => {
			const wg = new WaitGroup()
			expect(wg.done.bind(wg)).toThrow('Negative WaitGroup counter')
		})
	})
})
