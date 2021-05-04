import React, { useState, useEffect } from "react";
import CustomButton from "../../atom/Button";
import InputText from "./../../atom/InputText/index";
import NavBar from "../../molecules/NavigationBar";
import firebase from "../../../config/Firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => history.push("/"))
      .catch((error) => console.log("Error", error));
  };
  return (
    <div class="container-sm mb-4">
      <NavBar />
      <br />
      <h3>Login</h3>
      <p>Email</p>
      <InputText
        class="form-control"
        placeholder="Masukkan email anda"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <p>Password</p>
      <InputText
        class="form-control"
        placeholder="Masukkan password anda"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <br />

      <CustomButton
        onClick={handleSubmit}
        labelButton="Login"
        className="btn btn-primary"
      />
    </div>
  );
};

export default Login;
