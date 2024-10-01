import { applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: rootReducer,
}, applyMiddleware(thunk));

export default store;