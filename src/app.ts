import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { schema } from './api/schema';
import Models from './models';

import UserFrontAPI from './api/data-sources/UserFrontAPI';

(async function init() {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`
    )
    .then(() => console.log('DB connected'))
    .catch((error) => console.log(error));
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      headers: req.headers,
      domain: req.headers['apollographql-client-name'],
      dataSources: { UserFrontAPI: new UserFrontAPI() },
      Models,
    }),
  });
  await server.start();
  const app = express();
  app.use(
    '/graphql',
    cors({
      origin: '*',
      methods: ['POST', 'GET'],
    }),
    graphqlUploadExpress()
  );
  server.applyMiddleware({
    app,
    cors: true,
    path: '/graphql',
    bodyParserConfig: {
      limit: '20mb',
    },
  });
  app.listen(process.env.APP_PORT, () => {
    console.log(
      `GRAPHQL API URL http://localhost:${process.env.APP_PORT}/graphql`
    );
  });
})();
