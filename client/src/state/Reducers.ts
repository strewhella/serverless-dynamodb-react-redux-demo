import { Client } from '../../../server/db/models/Client';
import { AppState } from './AppState';
import * as Redux from 'redux';

export class Reducers {
    selectClient(state: AppState, { client }: { client: Client }): AppState {
        let newState = { ...state };
        newState.selectedClient = client;
        return newState;
    }

    httpSuccess(state: AppState, action: Redux.AnyAction): AppState {
        let newState = { ...state };
        newState[action.key] = {
            body: action.body
        };
        return newState;
    }

    httpError(state: AppState, action: Redux.AnyAction): AppState {
        let newState = { ...state };
        newState[action.key] = {
            error: true
        };
        return newState;
    }

    httpLoading(state: AppState, action: Redux.AnyAction): AppState {
        let newState = { ...state };
        newState[action.key] = {
            loading: true
        };
        return newState;
    }
}
