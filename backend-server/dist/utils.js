"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
exports.getTime = (startTime) => {
    const _start = new Date(startTime).getTime();
    const _end = new Date().getTime();
    const diff = Math.abs(_start - _end);
    return Math.floor(diff / 1000);
};
//# sourceMappingURL=utils.js.map