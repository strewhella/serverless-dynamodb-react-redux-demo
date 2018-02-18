import { Message } from 'semantic-ui-react';
import * as React from 'react';

interface ErrorMessageProps {
    heading?: string;
    message: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
    return (
        <Message>
            {props.heading && <Message.Header>{props.heading}</Message.Header>}
            <p>{props.message}</p>
        </Message>
    );
};
