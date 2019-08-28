import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";

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

models.sequelize.sync({ logging: true }).then(() => {
  app.listen(3000);
});
