import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './state/rootReducer';
import { httpMiddleware } from './state/middleware/httpMiddleware';

const store = Redux.createStore(
    rootReducer,
    Redux.applyMiddleware(httpMiddleware as any)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
