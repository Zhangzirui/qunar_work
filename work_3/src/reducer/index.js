import {
    RECEIVE_INITIAL_DATA,
    RECEIVE_DATA
} from 'action';

const rootReducer = (state, action) => {
    switch (action.type) {
        case RECEIVE_DATA:
            return [
                ...state,
                action.dataObj
            ].sort((x, y) => y.articleId - x.articleId);
        case RECEIVE_INITIAL_DATA:
            return [...state].concat(action.dataArr).sort((x, y) => y.articleId - x.articleId);
        default: 
            return state;
    }
};


export default rootReducer;