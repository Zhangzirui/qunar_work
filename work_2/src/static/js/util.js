export const isArray = function (arr) {
    if (Array.isArray) {
        return Array.isArray(arr);
    } else {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }
};

const PRESTR = 'ZZR_QUNAR_WORK';

export const storage = {
    get: function (key) {
        return localStorage.getItem(PRESTR + key);
    },
    set: function (key, value) {
        return localStorage.setItem(PRESTR + key, value);
    },
    remove: function (key) {
        return localStorage.removeItem(PRESTR + key);
    },
    clear: function () {
        localStorage.clear();
    }
}

export const addClass = function (ele, className) {
    const initialClass = ele.className;
    if (!initialClass.includes(className)) {
        if (ele.classList) {
            ele.classList.add(className);
        } else {
            ele.className = initialClass + ' ' + className;
        }
    }
}

export const removeClass = function (ele, className) {
    const initialClass = ele.className;
    if (initialClass.includes(className)) {
        if (ele.classList) {
            ele.classList.remove(className);
        } else {
            const pattern = new RegExp('(^|\\s+)(' + className.split(/\s+/).join('|') + ')(\\s+|$)', 'gi');
            ele.className = initialClass.replace(pattern, ' ');
        }
    }
}