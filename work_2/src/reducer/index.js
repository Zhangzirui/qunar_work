import {
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_TASK
} from 'action';

const taskReducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    completed: false
                }
            ];
        case DELETE_TASK:
            return state.filter(item => item.id !== action.id);
        case TOGGLE_TASK:
            return state.map(item => {
                if (item.id === action.id) {
                    return Object.assign({}, item, {
                        completed: !item.completed
                    });
                }
                return item;
            });
        default:
            return state;
    }
}

export default taskReducer;