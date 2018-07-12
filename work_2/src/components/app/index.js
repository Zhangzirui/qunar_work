import React from 'react';

import Header from 'components/header';
import TaskListWrap from 'containers/taskListWrap';
import TaskAddWrap from 'containers/TaskAddWrap';


export default class App extends React.Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <Header />
                <TaskListWrap />
                <TaskAddWrap />
            </div>
        );
    }
}