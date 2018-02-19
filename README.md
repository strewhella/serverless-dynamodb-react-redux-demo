Install NodeJS 6.10+

To run locally, first install NodeJS 6.10+ and NPM 5+ then install the Serverless framework globally

`npm i serverless@1.26 -g`

If on Mac or Unix, start the client and server simply with

`npm start`

This will install all the dependencies and then start the server and client. The server and client startup in parallel, so the client may be ready before the server. If this happens, just wait a few moments and refresh the browser.

If on Windows

In one Command window run

`npm i`

then navigate to the `client` folder and run

`npm start`

In a second Command window navigate to the `server` folder and run

`sls dynamodb install` and then

`sls offline start`

You can run the test suite with

`npm test`
