"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAlert = exports.hideAlert = void 0;
const hideAlert = () => {
    var _a;
    const el = document.querySelector('.alert');
    if (el)
        (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(el);
};
exports.hideAlert = hideAlert;
// type is 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
    var _a;
    (0, exports.hideAlert)();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(exports.hideAlert, time * 1000);
};
exports.showAlert = showAlert;
//# sourceMappingURL=alert.js.map