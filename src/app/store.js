import { createStore, combineReducers } from "redux";
import taskEvent from '../components/task/taskEvent';

const appReducer = combineReducers({ 
    taskReducer: taskEvent
});

const store = createStore(
    appReducer,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;