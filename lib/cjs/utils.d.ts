export declare const TIMEOUT: number;
declare global {
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
export declare function isMultiWalletEnvironment(): boolean;
