"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alert_1 = require("./alert");
const sortBy = async (sort) => {
    if (sort === 'NONE') {
        (0, alert_1.showAlert)('success', 'Loading ... ');
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    }
    else {
        (0, alert_1.showAlert)('success', 'Loading ... ');
        setTimeout(() => {
            window.location.href = `?fileType=${sort}`;
        }, 1500);
    }
    localStorage.setItem('selectedSort', sort);
};
window.addEventListener('DOMContentLoaded', () => {
    const sortByElement = document.getElementById('fileType');
    const selectedSort = localStorage.getItem('selectedSort');
    if (sortByElement && selectedSort) {
        sortByElement.value = selectedSort;
    }
});
exports.default = sortBy;
//# sourceMappingURL=sortBy.js.map