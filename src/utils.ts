// src/utils.ts

export const TIMEOUT: number = 3000;

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        ethereum: any;
    }
}

/**
 *
 *
 * @export
 * @return {*}  {boolean}
 */
export function isMultiWalletEnvironment(): boolean {
    const { ethereum } = window;

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
