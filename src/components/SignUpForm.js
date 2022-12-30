import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Navigate } from "react-router-dom";

const SignUpForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, id, password);
      setError("");
      window.alert("회원가입이 정상적으로 되었습니다.");
      Navigate("/");
    } catch (err) {
      setError(err.code);
    }
  };

  const onClick = async (event) => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.code);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="ID 를 입력하세요"
          maxLength={20}
          value={id}
          name="id"
        ></input>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          name="password"
          value={password}
          onChange={onChange}
        ></input>
        <input type="submit" value="회원가입"></input>
      </form>
      {error !== "" ? <div>{error}</div> : null}
      <button onClick={onClick}>SignUp with Google account</button>
    </div>
  );
};

export default SignUpForm;
