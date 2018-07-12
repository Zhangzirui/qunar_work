export const eventObj = {
    addHandler: function (ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, fn);
        } else {
            ele['on' + type] = fn;
        }
    },
    removeHandler: function (ele, type, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn, false);
        } else if (ele.detachEventListener) {
            ele.detachEventListener('on' + type, fn);
        } else {
            ele['on' + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    }
};

export const scrollObj = {
    getTop: () => document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
    getLeft: () => document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft 
};

export const addClass = function (ele, className) {
    const initName = ele.className;
    if (!initName.includes(className)) {
        if (ele.classList) {
            ele.classList.add(className);
        } else {
            ele.className = initName + ' ' + className;
        }
    }
}

export const delClass = function (ele, className) {
    const initName = ele.className;
    if (initName.includes(className)) {
        if (ele.classList) {
            ele.classList.remove(className);
        } else {
            const pattern = new RegExp('(^|\\s+)(' + className.split(/\s+/).join('|') + ')($|\\s+)', 'gi');
            ele.className = initName.replace(pattern, ' ').trim();
        }
        
    }
}

export const getXHR = (function () {
    if (typeof XMLHttpRequest) {
        return function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject) {
        return function () {
            try {
                return new ActiveXObject(MSXML2.XMLHttp)
            } catch (e) {
                return new ActiveXObject(Microsoft.XMLHttp)
            }
        }
    } else {
        throw new Error('can\'t get XHR');
    }
})();

export const ajax = function ({xhr, type = 'get', path, sendData = null}) {
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.open(type, path, true);
        xhr.send(sendData);
    }); 
};

export const throttle = (fn, wait) => {
    let timer; 
    return (...rest) => {
        if (!timer) {
            fn.apply(null, rest);
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
            }, wait);
        }
    }
}