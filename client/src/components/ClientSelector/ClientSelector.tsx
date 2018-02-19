import './ClientSelector.css';
import * as React from 'react';
import { ActionCreators } from '../../state/ActionCreators';
import { Client } from '../../../../server/db/models/Client';
import { HttpResponse } from '../../models/HttpResponse';
import { HttpLoader } from '../Loader/Loader';
import { Button, Header, Icon, Container } from 'semantic-ui-react';

interface ClientSelectorProps {
    dispatch: ActionCreators;
    clientsResponse: HttpResponse<Array<Client>>;
    selectedClient: Client;
}

export class ClientSelector extends React.Component<ClientSelectorProps> {
    componentWillMount(): void {
        this.props.dispatch.getClients();
    }

    render() {
        return (
            <div className="ClientSelector">
                <HttpLoader
                    response={this.props.clientsResponse}
                    text="Fetching clients..."
                >
                    <Container
                        textAlign="center"
                        className="ClientSelector-container"
                    >
                        <div>
                            <Header as="h1" icon>
                                <Icon name="users" circular />
                                <Header.Content>Login</Header.Content>
                            </Header>
                        </div>
                        <Button.Group className="ClientSelector-client-buttons">
                            {this.props.clientsResponse &&
                                this.props.clientsResponse.body &&
                                this.props.clientsResponse.body
                                    .concat([{ id: 'other', name: 'Other' }])
                                    .map(client => {
                                        let selected =
                                            this.props.selectedClient &&
                                            this.props.selectedClient.id ===
                                                client.id;
                                        return (
                                            <Button
                                                key={client.id}
                                                size="large"
                                                active={selected}
                                                onClick={() =>
                                                    this.props.dispatch.selectClient(
                                                        client
                                                    )
                                                }
                                            >
                                                {client.name}
                                            </Button>
                                        );
                                    })}
                        </Button.Group>
                    </Container>
                </HttpLoader>
            </div>
        );
    }
}
