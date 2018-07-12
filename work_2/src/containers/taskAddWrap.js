import {connect} from 'react-redux';

import TaskAdd from 'components/taskAdd';
import {addTask} from 'action';
import {initialId} from 'storage/getInitialValue';
import {setIdToStorage} from 'storage/setValueToStorage';

let taskId = initialId;

const mapDispatchToProps = dispatch => ({
    addTask: text => {
        dispatch(addTask(text));
        setIdToStorage(++taskId);
    }
});

const TaskAddWrap = connect(
    null,
    mapDispatchToProps
)(TaskAdd);

export default TaskAddWrap;