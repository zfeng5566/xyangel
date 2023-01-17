class HelloWorldPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('Hello', (compilation) => {
            console.log('11111');
        });
        compiler.hooks.assetEmitted.tap('Hello', (compilation) => {
          console.log(1111)
        });
        compiler.hooks.done.tap(
            'Hello World Plugin',
            (stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */) => {
                console.log('Hello World!');
            }
        );
    }
}
module.exports = HelloWorldPlugin;
