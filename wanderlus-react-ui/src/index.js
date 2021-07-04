import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { createStore,applyMiddleware } from 'redux';
import CounterReducer from './reducers/reducers'

import logger from 'redux-logger'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "bootstrap/dist/css/bootstrap.css";

let store=createStore(CounterReducer,applyMiddleware(logger))
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

