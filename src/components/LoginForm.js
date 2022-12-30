import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
const LoginForm = () => {
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
      await signInWithEmailAndPassword(auth, id, password);
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
        <input type="submit" value="로그인"></input>
      </form>
      {error !== "" ? <div>error</div> : null}
      <button onClick={onClick}>Login with Google account</button>
      <Link to="/signup">회원이 아니신가요?</Link>
    </div>
  );
};

export default LoginForm;
