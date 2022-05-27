import React, { useState } from "react";
import useInput from "../hooks/use-input";
import "./SignUp.css";
import { Link } from "react-router-dom";

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

    let isFormValid = false;
    if (userNameIsValid && passIsValid && confPassIsValid) isFormValid = true;

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!userNameIsValid && !passIsValid && !confPassIsValid) return;

        if (password !== confPassword) setError(true);

        console.log(userName, password);
        userReset();
        passReset();
        confPassReset();
    };

    const userClass = userHasError ? "form-control invalid" : "form-control";
    const passClass = passHasError ? "form-control invalid" : "form-control";
    const confPassClass = confPassHasError
        ? "form-control invalid"
        : "form-control";

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
                        {userHasError && (
                            <p className="error-text">Enter valid Email</p>
                        )}
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
                        {passHasError && (
                            <p className="error-text">Enter valid Password</p>
                        )}
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
                    {error && (
                        <p style={{ color: "red" }}>
                            *check the password again
                        </p>
                    )}
                    <div className="form-actions">
                        <Link Navigate to="/login" className="link">
                            Login
                        </Link>
                        <button disabled={!isFormValid}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignUp;
