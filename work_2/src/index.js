import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';

import App from 'components/app';
import rootReducer from 'reducer';
import {setStateToStorage} from 'storage/setValueToStorage';
import {initialState} from 'storage/getInitialValue';

import 'static/scss/index';



function storageMiddleware ({getState}) {
    return next => action => {
        let returnValue = next(action);
        setStateToStorage(getState());
        return returnValue;
    };
}

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(storageMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)