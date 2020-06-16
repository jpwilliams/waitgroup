module.exports = {
	roots: [
		'<rootDir>/src'
	],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	verbose: true,
	testEnvironment: 'node'
}
