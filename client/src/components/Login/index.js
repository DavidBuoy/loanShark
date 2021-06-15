import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";

// Trying to import from local file
import { FormBtn } from "../Form";
import { SharkContext } from "../../Context";

const Login = () => {
  const history = useHistory();
  const authContext = useContext(SharkContext);
  const [signInSuccess, setSignInSuccess] = useState("");
  const [signInError, setSignInError] = useState("");
  const [redirectOnSignIn, setRedirectOnSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [remember, setRemember] = useState(false);

  const validateForm = async (credentials) => {
    console.log(credentials);
    try {
      const url = "/auth";
      const fetchResponse = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(credentials), // body data type must match "Content-Type" header
      });
      const data = await fetchResponse.json();
      console.log(data);
      const { userInfo, message } = data;

      console.log(userInfo[0]);

      if (userInfo) {
        authContext.setAuthState(data);
        setSignInSuccess(message);
        setSignInError(null);
        return history.push("/profile", { from: "Login" });
      } else {
        setSignInError(message);
      }
      setTimeout(() => {
        setRedirectOnSignIn(true);
      }, 700);
    } catch (error) {
      setSignInError(error.message);
      setSignInSuccess(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm({ email, password });
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <FormGroup size="lg">
          <Label>Email</Label>
          <Input
            autoFocus
            type="email"
            value={email}
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup size="lg">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormBtn block size="lg" type="submit">
          Login
        </FormBtn>
      </Form>
      {signInError && <p> {signInError}</p>}
      {signInSuccess && <p> {signInSuccess}</p>}
    </div>
  );
};

export default Login;
