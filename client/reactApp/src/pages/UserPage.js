import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_USERS = gql`
  {
    getUsers {
      id
      name
    }
  }
`;

const GET_USERS_AND_BOOKS = gql`
  {
    getUsers {
      id
      name
    }
    getBooks {
      id
      name
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      name
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($name: String) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

export default () => {
  const [name, setName] = useState("");
  const { loading, error, data } = useQuery(GET_USERS);
  // const { loading, error, data } = useQuery(GET_USERS_AND_BOOKS);
  // const { loading, error, data } = useQuery(GET_USER, {
  //   variables: { id: 1 },
  // });
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addUser({ variables: { name } });
    setName("");
  };

  return (
    <div>
      <h1>User Page</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit"> Add User</button>
      </form>
      <hr />
      {data.getUsers.map((user) => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </div>
  );
};
