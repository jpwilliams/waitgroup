module.exports = {
	roots: [
		'<rootDir>/src'
	],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { useESM: true }]
	},
	verbose: true,
	testEnvironment: 'node'
}
