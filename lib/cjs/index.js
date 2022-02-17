"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectWalletProvider = exports.withMetaMask = void 0;
var detectWalletProvider_1 = __importDefault(require("./detectWalletProvider"));
exports.detectWalletProvider = detectWalletProvider_1.default;
var withMetaMask_1 = __importDefault(require("./withMetaMask"));
exports.withMetaMask = withMetaMask_1.default;
