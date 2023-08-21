import React from 'react';

function Error({ statusCode }: { statusCode?: number }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on the server`
                : 'An error occurred on the client'}
        </p>
    );
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
