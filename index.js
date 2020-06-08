export var on_error = Symbol("on_error");
export function try_handle(tryf, err_code, val) {
    try {
        return [[], [tryf(val)]];
    }
    catch (e) {
        return [[err_code, e], []];
    }
}
;
export default try_handle;
