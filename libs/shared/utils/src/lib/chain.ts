type OperatorFunction<P, R> = (args: P) => true | R;
class ChainNode<T> {
    constructor(private params: T, private funs: any[]) {}
    pipe<A>(fn: OperatorFunction<T, A>): ChainNode<A>;
    pipe<A, B>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>
    ): ChainNode<B>;
    pipe<A, B, C>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>
    ): ChainNode<C>;
    pipe<A, B, C, D>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>,
        fn3: OperatorFunction<C, D>
    ): ChainNode<D>;
    pipe<A, B, C, D, E>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>,
        fn3: OperatorFunction<C, D>,
        fn4: OperatorFunction<D, E>
    ): ChainNode<E>;
    pipe<A, B, C, D, E, F>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>,
        fn3: OperatorFunction<C, D>,
        fn4: OperatorFunction<E, F>
    ): ChainNode<F>;
    pipe<A, B, C, D, E, F, G>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>,
        fn3: OperatorFunction<C, D>,
        fn4: OperatorFunction<E, F>,
        fn5: OperatorFunction<F, G>
    ): ChainNode<G>;
    pipe<A, B, C, D, E, F, G, H>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>,
        fn3: OperatorFunction<C, D>,
        fn4: OperatorFunction<E, F>,
        fn5: OperatorFunction<F, G>,
        fn6: OperatorFunction<G, H>
    ): ChainNode<H>;
    pipe<A, B, C, D, E, F, G, H, I>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>,
        fn3: OperatorFunction<C, D>,
        fn4: OperatorFunction<E, F>,
        fn5: OperatorFunction<F, G>,
        fn6: OperatorFunction<G, H>,
        fn7: OperatorFunction<H, I>
    ): ChainNode<I>;
    pipe<A, B, C, D, E, F, G, H, I, J>(
        fn: OperatorFunction<T, A>,
        fn1: OperatorFunction<A, B>,
        fn2: OperatorFunction<B, C>,
        fn3: OperatorFunction<C, D>,
        fn4: OperatorFunction<E, F>,
        fn5: OperatorFunction<F, G>,
        fn6: OperatorFunction<G, H>,
        fn7: OperatorFunction<H, I>,
        fn8: OperatorFunction<I, J>
    ): ChainNode<J>;
    pipe(...operations: OperatorFunction<any, any>[]): ChainNode<any> {
        return new ChainNode(this.params, [...this.funs, ...operations]);
    }
    exec(): boolean {
        let res = false;
        let args: any = this.params;
        for (const fn of this.funs) {
            args = fn(args);
            if (args === true) {
                res = true;
                break;
            }
        }
        return res;
    }
}

export function makeOf<T>(args: T) {
    return new ChainNode<T>(args, []);
}

// class ChainNode<T, R> {
//     constructor(private fn: (arg: T) => R) {}
//     next<RR>(fn: (arg: R) => RR) {
//         return new ChainNode<R, RR>(fn);
//     }
//     start(args: T) {}
// }
// class ChainFirst<T> {
//     constructor(args: T) {
//         return ChainNode;
//     }
// }

// new ChainNode((args: { a: 1 }) => {
//     console.log(args);
//     return {
//         b: 2,
//     };
// })
//     .next((b) => {
//         console.log(b);
//         return {
//             c: 2,
//         } as const;
//     })
//     .next((c) => {
//         console.log(c);
//         return {
//             d: 3,
//         };
//     })
//     .start({
//         a: 1,
//     });

// -------------------------
// class ChainNode<T> {
//     arg: T = null as unknown as T;
//     set(v: T) {
//         this.arg = v;
//         return this;
//     }
//     next<R>(fn: (args: T) => R) {
//         const func = (args: T) => {
//             const res = fn(args);
//             return res;
//         };
//         type X = ReturnType<typeof func>;
//         return new ChainNode<X>();
//     }
// }

// const obj = { a: 1 };
// new ChainNode<typeof obj>()
//     .set(obj)
//     .next((arg) => {
//         console.log(arg);
//         return {
//             b: 2,
//         };
//     })
//     .next((d) => {
//         console.log(d);
//         return {
//             c: 4,
//         };
//     })
//     .next((c) => {
//         return {
//             d: 5,
//         };
//     });
