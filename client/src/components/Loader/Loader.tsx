import { Loader } from 'semantic-ui-react';
import { HttpResponse } from '../../models/HttpResponse';
import * as React from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Messages } from '../../util/Messages';

interface HttpLoaderProps {
    response: HttpResponse<{}>;
    text: string;
    children?: any;
}

export const HttpLoader = (props: HttpLoaderProps) => {
    return (
        <div>
            {((!props.response ||
                (props.response && props.response.loading)) && (
                <Loader active>{props.text}</Loader>
            )) ||
                (props.response &&
                    props.response.error && (
                        <ErrorMessage
                            heading={Messages.serverErrorHeading}
                            message={Messages.serverErrorMessage}
                        />
                    )) ||
                props.children}
        </div>
    );
};
