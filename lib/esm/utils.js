// src/utils.ts
export var TIMEOUT = 3000;
/**
 *
 *
 * @export
 * @return {*}  {boolean}
 */
export function isMultiWalletEnvironment() {
    var ethereum = window.ethereum;
    if (ethereum === undefined) {
        return false;
    }
    if (Object.hasOwnProperty.call(ethereum, "providers")) {
        if (ethereum.providers.length > 1) {
            return true;
        }
    }
    return false;
}
