"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHomePage = void 0;
const utils_1 = require("../src/utils/utils");
const renderHomePage = () => {
    return `
    <div class="${(0, utils_1.generateStyles)('bg-green-500', 'text-white', 'p-8', 'text-center', 'font-sans')}">
      <span class="${(0, utils_1.generateStyles)('font-bold')}">Welcome to our Amazing App!</span>
      <br />
      <span role="img" aria-label="rocket">🚀</span> Ready to experience something extraordinary?{' '}
      <span role="img" aria-label="star">🌟</span>
    </div>
  `;
};
exports.renderHomePage = renderHomePage;
