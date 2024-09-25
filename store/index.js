"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const donations_1 = __importDefault(require("./donations"));
const store = (0, toolkit_1.configureStore)({
    reducer: {
        donations: donations_1.default,
    },
});
exports.default = store;
