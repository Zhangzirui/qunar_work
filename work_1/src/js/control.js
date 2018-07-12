import {eventObj, scrollObj, addClass, delClass, throttle} from 'js/unit';

const footer = document.getElementById('footer');
const nav = document.getElementById('nav');
const LIMITHEIGHT = 60; 
const footerHidden = 'footerHidden';
const navShow = 'navShow';
const navHidden = 'navHidden';
let initScrollTop = 0;

const scrollEvent = throttle(__scrollEvent, 200);

eventObj.addHandler(document, 'scroll', scrollEvent);



function __scrollEvent (e) {
    let scrollTop = scrollObj.getTop();
    if (scrollTop > initScrollTop) {
        addClass(footer, footerHidden);
        if (scrollTop > LIMITHEIGHT) {
            delClass(nav, navShow);
            addClass(nav, navHidden);
        }
    } else {
        delClass(footer, footerHidden);
        if (scrollTop > LIMITHEIGHT) {
            delClass(nav, navHidden);
            addClass(nav, navShow);
        }
    }
    initScrollTop = scrollTop;
}