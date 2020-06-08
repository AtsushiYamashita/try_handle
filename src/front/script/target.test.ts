/// <reference path="types/index.d.ts" />

// @ts-ignore
import * as ChaiJs from "https://dev.jspm.io/chai"
import try_handle from "./target.js"

const chai: Chai.ChaiStatic = !!ChaiJs && ChaiJs.default;
const thrower = (n: number) => { if (n < 1) throw new Error("message"); return n; }

export const suite = (describe: any, it: any) => {
    if (chai === undefined) return;

    const expect = chai.expect;
    chai.should();
    chai.config.includeStack = true;
    chai.config.truncateThreshold = 4;

    describe("When throwed error", function () {

        it('simple thrower', () => {
            const casef = try_handle(thrower, 100, 0);
            const casep = try_handle(thrower, 101, 1);
            expect(casef[0]).to.length(2);
            expect(casef[1]).to.length(0);
            expect(casep[0]).to.length(0);
            expect(casep[1]).to.length(1);
        });
        
        it('simple thrower cb fail', () => {
            const casef = try_handle(thrower, 100, 0);
        
            expect(casef[0]).to.contain(100)
            casef[1].forEach(res=>expect(res).to.equal("unhappen"))
        });
        
        it('simple thrower cb pass', () => {
            const casep = try_handle(thrower, 101, 1);
        
            // casep[0].forEach(err=>expect(err).to.equal("unhappen"))
            casep[1].forEach(res=>expect(res).to.equal(1))
        });
        
    });

    


}
