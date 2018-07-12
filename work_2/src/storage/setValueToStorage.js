// 对 state 和 id 进行存储

import {
    STATE_KEY,
    INITIAL_ID_KEY,
    TASK_CONNECTION
} from './constant';

import { 
    isArray,
    storage
 } from 'static/js/util';

export const setStateToStorage = function (state) {
    if (!isArray(state)) {
        throw new Error('error: state is not array!');
    }
    let stateStr = '';
    const len = state.length
    state.map((item, index) => {
        stateStr += JSON.stringify(item);
        if (index < len - 1) {
            stateStr += TASK_CONNECTION;
        }
    })
    storage.set(STATE_KEY, stateStr);
};

export const setIdToStorage = function (id) {
    storage.set(INITIAL_ID_KEY, id);
}

