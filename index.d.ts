import { Func, Set } from "shorter-dts";
export declare const on_error: unique symbol;
export declare function try_handle<A, R>(tryf: Func<A, R>, err_code: number | string | symbol, val: A): Set<any[], R[]>;
export default try_handle;
