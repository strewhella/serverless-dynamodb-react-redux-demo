import * as React from 'react';
import './App.css';
import { AppState } from '../../state/AppState';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../state/ActionCreators';
import { Container } from 'semantic-ui-react';
import { ClientSelector } from '../ClientSelector/ClientSelector';

interface AppProps {
    state: AppState;
    dispatch: ActionCreators;
}

class App extends React.Component<AppProps> {
    render() {
        return (
            <Container className="App">
                <ClientSelector
                    selectedClient={this.props.state.selectedClient}
                    dispatch={this.props.dispatch}
                    clientsResponse={this.props.state.getClients}
                />
            </Container>
        );
    }
}
const mapStateToProps = (state: AppState) => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<AppState>) => {
    return {
        dispatch: Redux.bindActionCreators(
            new ActionCreators() as any,
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
