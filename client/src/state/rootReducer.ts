import { AppState } from './AppState';
import * as Redux from 'redux';
import { Reducers } from './Reducers';

const getInitialState = () => new AppState();

let reducers = new Reducers();

export default (state: AppState, action: Redux.Action): AppState => {
    if (!state) {
        state = getInitialState();
    }

    if (reducers[action.type]) {
        state = reducers[action.type](state, action);
    }

    return state;
};
