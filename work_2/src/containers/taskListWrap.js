import {connect} from 'react-redux';

import TaskList from 'components/taskList';
import {toggleTask, deleteTask} from 'action';
import {isArray} from 'static/js/util';


function getDidCount (tasks) {
    let num = 0;
    if (isArray(tasks)) {
        tasks.forEach(task => {
            if (task.completed) {
                num++;
            }
        });
    }
    return num;
}

function getAllCount (tasks) {
    let num = 0;
    if (isArray(tasks)) {
        num = tasks.length;
    }
    return num;
}

const mapStateToProps = state => ({
    tasks: state,
    did: getDidCount(state),
    all: getAllCount(state)
});


const mapDispatchToProps = dispatch => ({
    toggleTask: id => dispatch(toggleTask(id)),
    deleteTask: id => dispatch(deleteTask(id))
});


const TaskListWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);

export default TaskListWrap;
