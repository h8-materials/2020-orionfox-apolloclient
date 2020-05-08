const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
  }

  extend type Query {
    getUsers: [User]
    getUser(id: ID): User
  }

  extend type Mutation {
    addUser(name: String): User
  }
`;

const users = [{ id: 1, name: "Kosasih" }];
const books = [
  { id: 1, name: "Book 1" },
  { id: 1, name: "Book 2" },
];

const resolvers = {
  Query: {
    getUsers: (parent, args, context, info) => {
      return users;
    },
    getUser: (parent, args, context, info) => {
      console.log(args, "args");
      user = users.filter((user) => user.id == args.id);
      return user[0];
    },
  },
  Mutation: {
    addUser: (parent, args) => {
      const newUser = {
        id: users.length + 1,
        name: args.name,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
