import { sharedUtils } from './shared-utils';

import {makeOf } from './chain'
describe('sharedUtils', () => {
    it('should work', () => {
        const res =  makeOf({a:1}).pipe((a)=>{
            if(a.a === 1){
                return true;
            }
            return {}
        },
        (b)=>{
            return {
                c:2
            }
        }).exec();

        expect(res).toEqual(true);
    });

    it('should work', () => {
        const chainNode =  makeOf({a:1}).pipe((a)=>{
            if(a.a === 2){
                return true;
            }
            return {name:123}
        },
        (b)=>{
            if(b.name === 100){
                return true;

            }
            return {
                c:2
            };
        });

        const res = chainNode.pipe((params)=>{
            return params.c === 2;

        }).exec()

        expect(res).toEqual(true);
    });
});
