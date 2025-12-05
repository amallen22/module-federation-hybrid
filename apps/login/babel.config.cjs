module.exports = function (api) {
    api.cache(true);

    const presets = [
        ['@babel/preset-env', {
            'targets': {
                'browsers': [
                    'last 2 versions',
                    'ie 11'
                ]
            },
            'modules': 'commonjs',
            'useBuiltIns' : 'usage',
            'corejs' : '3'
        }],
        ['@babel/preset-react', { 'development': true }]
    ];

    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-classes',
        [
            '@emotion',
            {
                'sourceMap': true,
                'autoLabel': 'dev-only',
                'labelFormat': '[local]',
                'cssPropOptimization': true
            }
        ]
    ];

    return {
        presets,
        plugins,
    };
};