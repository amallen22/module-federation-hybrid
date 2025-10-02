module.exports = function (api) {
    api.cache(true);

    const presets = [
        ['@babel/preset-env'],
        ['@babel/react'],
        ['@babel/preset-typescript']
    ];

    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-class-properties',
        '@babel/plugin-transform-object-rest-spread',
        '@babel/plugin-transform-classes',
    ];

    return {
        presets,
        plugins,
        sourceType: 'unambiguous'
    };
};