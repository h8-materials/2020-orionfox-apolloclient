import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import client from "./services/graphql";
import UserPage from "./pages/UserPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <UserPage />
      </ApolloProvider>
    </div>
  );
}

export default App;
