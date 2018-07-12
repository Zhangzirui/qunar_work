import React from 'react';
import PropTypes from 'prop-types';

import {
    isArray,
    addClass,
    removeClass
} from 'static/js/util';
import './taskList';

export default class TaskList extends React.Component {
    constructor () {
        super();
    }

    render () {
        let tasks = this.props.tasks;
        return (
            <div id="taskList">
                <ul>
                {
                    isArray(tasks) && tasks.map(task => {
                        return (
                            <li key={task.id} className={task.completed ? "taskItem active" : "taskItem"}>
                                <input id={task.id} type="checkbox" ref="checkBox" onChange={this.toggleTaskEvent.bind(this, task.id)} checked={task.completed}/>
                                <label htmlFor={task.id} ref="taskText" className={task.completed ? 'taskText active' : 'taskText'}>{task.text}</label>
                                <span className="taskDel" onClick={this.deleteTaskEvent.bind(this, task.id)}>删除</span>
                            </li>
                        );
                    })
                }
                    <li className="statistics">
                        <span className="didNum">{this.props.did}</span>
                        已完成&nbsp;/&nbsp;
                        <span className="allNum">{this.props.all}</span>
                        总数
                    </li>
                </ul>
            </div>
        );
    }

    toggleTaskEvent (id) {
        this.props.toggleTask(id);
        // setStateToStorage(this.props.tasks);
    }

    deleteTaskEvent (id) {
        this.props.deleteTask(id);
        // setStateToStorage(this.props.tasks);
    }
}