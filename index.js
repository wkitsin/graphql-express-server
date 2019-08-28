import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());

const SECRET = "j4y3AFDEJADB123A856R4AWERTEW21GA3";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(async req => {
  const token = req.headers.authorization;

  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (error) {
    console.log(error);
  }

  req.next();
});

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: { models, SECRET, user: req.user }
  }))
);

const server = createServer(app);

models.sequelize.sync({ logging: true }).then(() => {
  server.listen(3000, () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema
      },
      {
        server,
        path: "/subscriptions"
      }
    );
  });
});
