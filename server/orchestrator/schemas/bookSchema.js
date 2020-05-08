const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    id: ID
    name: String
  }

  extend type Query {
    getBooks: [Book]
  }
`;

const books = [
  { id: 1, name: "Book 1" },
  { id: 1, name: "Book 2" },
];

const resolvers = {
  Query: {
    getBooks: () => {
      return books;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
