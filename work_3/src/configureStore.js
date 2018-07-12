import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from 'reducer';

const initialState = [];
const loggerMiddleware = createLogger();

const configureStore = () => {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
};

export default configureStore;
