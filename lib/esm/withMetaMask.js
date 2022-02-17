// src/withMetaMask.tsx
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from "react";
import * as ethers from "ethers";
import detectWalletProvider from "./detectWalletProvider";
export default function withMetaMask(WrapperComponent) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.provider = undefined;
            _this.state = {
                isInstalled: false,
                isConnected: false,
                error: undefined,
            };
            _this.requestAccounts = _this.requestAccounts.bind(_this);
            _this.requestSign = _this.requestSign.bind(_this);
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            var _this = this;
            detectWalletProvider("Metamask" /* Metamask */).then(function (provider) {
                _this.provider = new ethers.providers.Web3Provider(provider);
                _this.setState({
                    isInstalled: true,
                });
            }).catch(function (error) {
                console.warn(error);
                _this.setState({
                    isInstalled: false,
                });
            });
        };
        class_1.prototype.send = function (method) {
            if (this.provider === undefined)
                throw new Error("MetaMask is not installed");
            return this.provider.send(method, []);
        };
        class_1.prototype.requestAccounts = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.send("eth_requestAccounts")];
                        case 1:
                            response = _a.sent();
                            this.setState({
                                isConnected: true,
                            });
                            return [2 /*return*/, response];
                        case 2:
                            error_1 = _a.sent();
                            // this.error = error;
                            this.setState({
                                isConnected: false,
                                error: error_1
                            });
                            return [2 /*return*/, undefined];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        class_1.prototype.requestSign = function (message) {
            return __awaiter(this, void 0, void 0, function () {
                var signer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.provider === undefined)
                                throw new Error("MetaMask is not installed");
                            signer = this.provider.getSigner();
                            return [4 /*yield*/, signer.signMessage(message)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        class_1.prototype.render = function () {
            var _a = this.state, error = _a.error, isConnected = _a.isConnected, isInstalled = _a.isInstalled;
            return React.createElement(WrapperComponent, { requestSign: this.requestSign, requestAccounts: this.requestAccounts, isConnected: isConnected, error: error, isInstalled: isInstalled });
        };
        return class_1;
    }(React.Component));
}
