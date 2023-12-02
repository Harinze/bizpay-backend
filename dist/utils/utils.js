"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStyles = void 0;
// utils.ts
const generateStyles = (...classNames) => {
    return classNames.flat().join(' ');
};
exports.generateStyles = generateStyles;
