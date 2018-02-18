import { AppState } from './AppState';
import * as Redux from 'redux';

const getInitialState = () => ({
    test: 'this is a test'
});

export default (state: AppState, action: Redux.Action): AppState => {
    if (!state) {
        state = getInitialState();
    }

    return state;
};
