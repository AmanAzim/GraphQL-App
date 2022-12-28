const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const { seedDb } = require('./seed');
const rootSchema = require('./schemas/rootSchema');

const app = express();

const port = parseInt(process.env.LISTEN_PORT || '4000');
const host = process.env.LISTEN_HOST || '0.0.0.0';

app.use('/graphql', graphqlHTTP({ 
    schema: rootSchema,
    graphiql: true, // Enabling similar thing like ApiDocs of swagger// we want to use graphiql tool when hitting this route // Jus to test the api directly in the broswer under server port // http://localhost:4000/graphql
}));

mongoose.connect(process.env.MONGO_DB_URL).then(async () => {
    await seedDb();

    app.listen(port, () => {
        console.log(`Service is listening on ${host}:${port}`);
    });
});
  