module.exports = {
    name: 'remote-app',
    exposes: {
        './Module': './src/remote-entry.ts',
    },
};
