import React, { useState } from "react";
import Credential from "./Components/Credentials/Credential";
import Valuation from "./Components/Valuations/Valuation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [state, setState] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
  });

  const call = (name, username) => {
    console.log("user page clicked");
    setState(!state);
    setUser({
      name: name,
      username: username,
    });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Credential passClick={call} />} />
          <Route
            exact
            path="/user"
            element={<Valuation authorized={state} username={user} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
