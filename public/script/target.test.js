/// <reference path="types/index.d.ts" />
// @ts-ignore
import * as ChaiJs from "https://dev.jspm.io/chai";
import try_handle from "./target.js";
var chai = !!ChaiJs && ChaiJs.default;
var thrower = function (n) { if (n < 1)
    throw new Error("message"); return n; };
export var suite = function (describe, it) {
    if (chai === undefined)
        return;
    var expect = chai.expect;
    chai.should();
    chai.config.includeStack = true;
    chai.config.truncateThreshold = 4;
    describe("When throwed error", function () {
        it('simple thrower', function () {
            var casef = try_handle(thrower, 100, 0);
            var casep = try_handle(thrower, 101, 1);
            expect(casef[0]).to.length(2);
            expect(casef[1]).to.length(0);
            expect(casep[0]).to.length(0);
            expect(casep[1]).to.length(1);
        });
        it('simple thrower cb fail', function () {
            var casef = try_handle(thrower, 100, 0);
            expect(casef[0]).to.contain(100);
            casef[1].forEach(function (res) { return expect(res).to.equal("unhappen"); });
        });
        it('simple thrower cb pass', function () {
            var casep = try_handle(thrower, 101, 1);
            // casep[0].forEach(err=>expect(err).to.equal("unhappen"))
            casep[1].forEach(function (res) { return expect(res).to.equal(1); });
        });
    });
};
