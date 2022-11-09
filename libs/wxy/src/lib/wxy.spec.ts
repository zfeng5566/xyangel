import { wxy } from './wxy';
import { extract,emitFile } from './sirius-nohup'

describe('wxy', () => {
    it('should work', () => {
        expect(wxy()).toEqual('wxy');
        // emitFile('1.txt',extract('/Users/iwang/nohup.out'));

    });
});
