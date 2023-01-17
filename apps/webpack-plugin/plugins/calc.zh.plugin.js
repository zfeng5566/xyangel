class CalcZhPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap("AAA",(compilation)=>{
            console.log(compiler,compilation)

        })
    }
  }
module.exports = CalcZhPlugin;
  