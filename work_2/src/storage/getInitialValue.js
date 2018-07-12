// 从 localStorage 中获取 state 和 id，方便初始化

import {storage} from 'static/js/util';

import {
    STATE_KEY,
    INITIAL_ID_KEY,
    TASK_CONNECTION
} from './constant';

const getInitialState = function () {
    const tasksStr = storage.get(STATE_KEY);
    let tasks = [];
    if (tasksStr) {
        if (tasksStr.includes(TASK_CONNECTION)) {
            tasksStr.split(TASK_CONNECTION).map(item => {
                tasks.push(JSON.parse(item));
            })
        } else {
            tasks.push(JSON.parse(tasksStr));
        } 
    }
    return tasks;
}

const getInitialId = function () {
    const idStr = storage.get(INITIAL_ID_KEY);
    let taskId = 0;
    if (idStr) {
        taskId = +idStr;
    }
    return taskId;
}

export const initialState = getInitialState();
export const initialId = getInitialId();

