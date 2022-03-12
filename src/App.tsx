import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import client from "./ApolloClient";
import Country from "./pages/Country";
import Home from "./pages/Home";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className=" w-full flex justify-center pt-5 dark:bg-slate-400 min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:code" element={<Country />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
