const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const bookSchema = require("./schemas/bookSchema");
const userShema = require("./schemas/userSchema");

const typeDefs = `
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, bookSchema.typeDefs, userShema.typeDefs],
  resolvers: [userShema.resolvers, bookSchema.resolvers],
});

const server = new ApolloServer({
  schema,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
