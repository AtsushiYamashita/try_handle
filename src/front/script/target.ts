import { Func, Set } from "shorter-dts"

export const on_error: unique symbol = Symbol("on_error");

export function try_handle<A, R>(
    tryf: Func<A, R>,
    err_code: number | string | symbol,
    val: A
): Set<any[], R[]> {
    try {
        return [[], [tryf(val)]];
    } catch (e) {
        return [[err_code, e], []]
    }
};

declare namespace TryHandle {
    export type try_handle = <A, R>(tryf: Func<A, R>, err_code: string | number | symbol, val: A)=> Set<any[], R[]>    ; 
}

declare const tryhandle:TryHandle.try_handle;

export default try_handle;
