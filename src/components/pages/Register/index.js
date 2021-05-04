import React, { useState, useEffect } from "react";
import CustomButton from "../../atom/Button";
import InputText from "../../atom/InputText";
import NavBar from "../../molecules/NavigationBar";
import firebase from "../../../config/Firebase";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");

  let history = useHistory();

  const handleSubmit = () => {
    const data = {
      email: email,
      fullName: fullName,
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);

        const userId = userCredential.user.uid;
        //Save to realtime database
        firebase
          .database()
          .ref("users/" + userId)
          .set({ data });

        setFullname("");
        setPassword("");
        setEmail("");

        //Redirect to Login
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="container-sm mb-4">
      <NavBar />
      <br />
      <h3>Register User Baru</h3>
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

      <p>Nama Lengkap</p>
      <InputText
        class="form-control"
        placeholder="Masukkan nama lengkap anda"
        value={fullName}
        onChange={(event) => setFullname(event.target.value)}
      />
      <br />

      <CustomButton onClick={handleSubmit} labelButton="Register" className="btn btn-primary" />
    </div>
  );
};

export default RegisterPage;
