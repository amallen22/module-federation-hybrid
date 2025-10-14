module.exports = {
    collectCoverageFrom: [
        'src/app/**/*.js',
        'src/app/*.js',
        'src/app/**/*.jsx',
        'src/app/*.jsx'
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            'branches': 0,
            'functions': 0,
            'lines': 0,
            'statements': 0
        }
    },
    globals: {
        NODE_ENV: 'test'
    },
    moduleDirectories: [
        'node_modules',
        'src/app'
    ],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'identity-obj-proxy',
        '^.+\\.(png|jpg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    modulePathIgnorePatterns: [
        'src/public_local',
        'src/public_stage',
        'src/public_production'
    ],
    setupFilesAfterEnv: ['<rootDir>/scripts/jest/setup.js'],
    testPathIgnorePatterns: [
        '__tests__/step-definitions'
    ],
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://local.resumecoach.com'
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@npm_leadtech)/)',
    ]
};
