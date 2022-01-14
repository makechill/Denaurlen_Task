import React, { useState } from "react";
import "./Credential.css";
import { addUser } from "../../Service/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userDetails = {
  name: "",
  username: "",
};

const Credential = (props) => {
  const [user, setUser] = useState(userDetails);
  const { name, username } = user;
  const navigate = useNavigate();

  const handleInput = async (e) => {
    setUser((preValue) => {
      return { ...preValue, [e.target.name]: e.target.value };
    });
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/user");
    console.log(user);
    addUser(user);
    props.passClick(user.name, user.username);
  };

  return (
    <div className="form_container">
      <div className="form_group">
        <h1 className="form_title">Enter the credentials</h1>
        <form
          autoComplete="off"
          className="form"
          onSubmit={handleSubmit}
          method="post"
        >
          <input
            type="text"
            className="name"
            name="name"
            placeholder="Enter your name"
            onChange={handleInput}
            value={name}
          />
          <input
            type="text"
            className="username"
            name="username"
            placeholder="Enter your username"
            onChange={handleInput}
            value={username}
          />
          <button type="submit" className="submit_btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Credential;
