import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { FormBtn } from "../Form";
import "./style.css";
import savePerson from "../../utils/RegisterAPI";

function Register() {
  const history = useHistory();
  const [formObject, setFormObject] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.name && formObject.email && formObject.password) {
      savePerson({
        user_name: formObject.name,
        email: formObject.email,
        password: formObject.password,
      })
        .then(history.push("/login", { from: "Register" }))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="Login">
      <Form>
        <h3>Want to Join Loan Shark?</h3>
        <FormGroup size="lg">
          <Label>Full Name</Label>
          <Input
            onChange={handleInputChange}
            name="name"
            placeholder="First and Last Name"
          />
        </FormGroup>
        <FormGroup size="lg">
          <Label>Email</Label>
          <Input
            onChange={handleInputChange}
            name="email"
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup size="lg">
          <Label>Password</Label>
          <Input
            onChange={handleInputChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </FormGroup>
        <FormBtn
          disabled={
            !(formObject.name && formObject.email && formObject.password)
          }
          type="submit"
          onClick={handleFormSubmit}
        >
          Register
        </FormBtn>
      </Form>
    </div>
  );
}

export default Register;
