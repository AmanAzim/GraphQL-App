const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

const port = parseInt(process.env.LISTEN_PORT || '4000');
const host = process.env.LISTEN_HOST || '0.0.0.0';

app.use('/graphql', graphqlHTTP({

}));

app.listen(port, () => {
    console.log(`Service is listening on ${host}:${port}`);
});