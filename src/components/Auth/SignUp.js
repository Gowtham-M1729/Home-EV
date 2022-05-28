import React, { useState } from "react";
import useInput from "../hooks/use-input";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [error, setError] = useState(false);

  const {
    value: userName,
    valueIsValid: userNameIsValid,
    hasError: userHasError,
    inputHandler: userInputHandler,
    onBlurHandler: userBlurHandler,
    reset: userReset,
  } = useInput((value) => value.includes("@"));

  const {
    value: reg,
    valueIsValid: regIsValid,
    hasError: regHasError,
    inputHandler: regInputHandler,
    onBlurHandler: regBlurHandler,
    reset: regReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: password,
    valueIsValid: passIsValid,
    hasError: passHasError,
    inputHandler: passInputHandler,
    onBlurHandler: passBlurHandler,
    reset: passReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: confPassword,
    valueIsValid: confPassIsValid,
    hasError: confPassHasError,
    inputHandler: confPassInputHandler,
    onBlurHandler: confPassBlurHandler,
    reset: confPassReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: name,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    inputHandler: nameInputHandler,
    onBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: userNumber,
    valueIsValid: userNumberIsValid,
    hasError: userNumberHasError,
    inputHandler: userNumberInputHandler,
    onBlurHandler: userNumberBlurHandler,
    reset: userNumberReset,
  } = useInput((value) => value.trim() !== "");

  let isFormValid = false;
  if (
    userNameIsValid &&
    passIsValid &&
    confPassIsValid &&
    nameIsValid &&
    userNumberIsValid &&
    regIsValid
  )
    isFormValid = true;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (
      !userNameIsValid &&
      !passIsValid &&
      !confPassIsValid &&
      !nameIsValid &&
      !userNumberIsValid &&
      !regIsValid
    )
      return;

    if (password !== confPassword) {
      setError(true);
      return;
    }

    try {
      if (!userName || !password) return;
      const response = await axios.post(
        "https://homeev.herokuapp.com/user/signup",
        {
          email: userName,
          password: password,
          name: name,
          mob_no: userNumber,
          reg_no: reg,
        },
        null
      );
      userReset();
      passReset();
      confPassReset();
      nameReset();
      userNumberReset();
      regReset();
      console.log(response);
    } catch (err) {
      console.error(err);
      userReset();
      passReset();
      confPassReset();
      nameReset();
      userNumberReset();
      regReset();
    }
  };

  const userClass = userHasError ? "form-control invalid" : "form-control";
  const passClass = passHasError ? "form-control invalid" : "form-control";
  const confPassClass = confPassHasError
    ? "form-control invalid"
    : "form-control";
  const nameClass = nameHasError ? "form-control invalid" : "form-control";
  const userNumberClass = userNumberHasError
    ? "form-control invalid"
    : "form-control";
  const regClass = regHasError ? "form-control invalid" : "form-control";

  const submitHandler = async () => {};

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="signup-box">
        <h3>Sign Up!</h3>
        <div className="control-group">
          <div className={userClass}>
            <label htmlFor="name">Email</label>
            <input
              type="text"
              id="name"
              onChange={userInputHandler}
              onBlur={userBlurHandler}
              value={userName}
            />
            {userHasError && <p className="error-text">Enter valid Email</p>}
          </div>
          <div className={nameClass}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={nameInputHandler}
              onBlur={nameBlurHandler}
              value={name}
            />
            {nameHasError && <p className="error-text">Enter valid name</p>}
          </div>
          <div className={userNumberClass}>
            <label htmlFor="phone">Mobile</label>
            <input
              type="number"
              id="phone"
              min={6000000000}
              max={9999999999}
              minLength={10}
              maxlength={10}
              name="num"
              pattern="[0-9]"
              onChange={userNumberInputHandler}
              onBlur={userNumberBlurHandler}
              value={userNumber}
              placeholder="Enter 10-digit mobile number"
            />
            {userNumberHasError && (
              <p className="error-text">Enter valid mobile number</p>
            )}
          </div>
          <div className={regClass}>
            <label htmlFor="name">reg_no</label>
            <input
              type="text"
              id="name"
              onChange={regInputHandler}
              onBlur={regBlurHandler}
              value={reg}
            />
            {nameHasError && <p className="error-text">Enter valid name</p>}
          </div>

          <div className={passClass}>
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="password"
              onChange={passInputHandler}
              onBlur={passBlurHandler}
              value={password}
            />
            {passHasError && <p className="error-text">Enter valid Password</p>}
          </div>
          <div className={confPassClass}>
            <label htmlFor="name">confirm Password</label>
            <input
              type="password"
              id="confirm password"
              onChange={confPassInputHandler}
              onBlur={confPassBlurHandler}
              value={confPassword}
            />
            {confPassHasError && (
              <p className="error-text">Enter valid Password</p>
            )}
          </div>
          {error && <p style={{ color: "red" }}>*check the password again</p>}
          <div className="form-actions">
            <Link Navigate to="/login" className="link">
              Login
            </Link>
            <button disabled={!isFormValid} onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
