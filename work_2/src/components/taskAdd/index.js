import React from 'react';

import './taskAdd';

export default class TaskAdd extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div id="taskAdd">
                <form onSubmit={this.addTaskEvent.bind(this)}>
                    <p>
                        <label htmlFor="addInput">Task</label>
                        <input id="addInput" type="text" placeholder="你想做点什么" ref="addInput"/>
                    </p>
                    <p>
                        <button type="submit" className="addButton">Save Task</button>
                    </p>
                </form>
            </div>
        );
    }

    addTaskEvent (e) {
        const event = e || window.event;
        event.preventDefault();

        const addInputEle = this.refs.addInput;
        let text = addInputEle.value;
        this.props.addTask(text);
        addInputEle.value = '';
    }
}