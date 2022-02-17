"use strict";
// src/utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMultiWalletEnvironment = exports.TIMEOUT = void 0;
exports.TIMEOUT = 3000;
/**
 *
 *
 * @export
 * @return {*}  {boolean}
 */
function isMultiWalletEnvironment() {
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
exports.isMultiWalletEnvironment = isMultiWalletEnvironment;
