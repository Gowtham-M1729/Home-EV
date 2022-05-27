// export default ProviderRegister;
import React, { useState } from "react";
import useInput from "../hooks/use-input";
import "../Auth//SignUp.css";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";

const SignUp = () => {
    const [error, setError] = useState(false);
    const [radio, setRadio] = useState(false);

    const {
        value: userName,
        valueIsValid: userNameIsValid,
        hasError: userNameHasError,
        inputHandler: userNameInputHandler,
        onBlurHandler: userNameBlurHandler,
        reset: userNameReset,
    } = useInput((value) => value.trim() !== "");

    const {
        value: userNumber,
        valueIsValid: userNumberIsValid,
        hasError: userNumberHasError,
        inputHandler: userNumberInputHandler,
        onBlurHandler: userNumberBlurHandler,
        reset: userNumberReset,
    } = useInput((value) => value.trim() !== "");

    const {
        value: userMailId,
        valueIsValid: userMailIdIsValid,
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
    if (
        userNameIsValid &&
        userNumberIsValid &&
        userMailIdIsValid &&
        passIsValid &&
        confPassIsValid
    )
        isFormValid = true;

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (
            !userNameIsValid &&
            !userNumberIsValid &&
            !userMailIdIsValid &&
            !passIsValid &&
            !confPassIsValid
        )
            return;

        if (password !== confPassword) setError(true);

        console.log(userName, userNumber, userMailId, password);
        userNameReset();
        userNumberReset();
        userReset();
        passReset();
        confPassReset();
    };

    const userNameClass = userNameHasError
        ? "form-control invalid"
        : "form-control";
    const userNumberClass = userNumberHasError
        ? "form-control invalid"
        : "form-control";
    const userClass = userHasError ? "form-control invalid" : "form-control";
    const passClass = passHasError ? "form-control invalid" : "form-control";
    const confPassClass = confPassHasError
        ? "form-control invalid"
        : "form-control";

    const handleClick = (e) => {
        setRadio(e);
        console.log(e);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="signup-box">
                <h3>Sign Up!</h3>
                <div className="control-group">
                    <div className={userNameClass}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={userNameInputHandler}
                            onBlur={userNameBlurHandler}
                            value={userName}
                            placeholder="Enter Name"
                        />
                        {userNameHasError && (
                            <p className="error-text">Enter valid Name</p>
                        )}
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
                            <p className="error-text">
                                Enter valid mobile number
                            </p>
                        )}
                    </div>
                    <div className={userClass}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={userInputHandler}
                            onBlur={userBlurHandler}
                            value={userMailId}
                            placeholder="Enter email"
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
                            placeholder="Enter password"
                        />
                        {passHasError && (
                            <p className="error-text">Enter valid Password</p>
                        )}
                    </div>
                    <div className={confPassClass}>
                        <label htmlFor="name">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm password"
                            onChange={confPassInputHandler}
                            onBlur={confPassBlurHandler}
                            value={confPassword}
                            placeholder="Re-Enter password"
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
                    <div>
                        {/* <input type="checkbox" onChange={this.handleClick}/> I agree to share current location */}
                        <Checkbox
                            otherProps
                            onChange={(e) => this.handleClick}
                            htmlfor="checkBox"
                        >
                        </Checkbox>
                        <label id="checkbox">I agree to share current location</label>
                    </div>
                    <br />
                    <div className="form-actions">
                        <Link Navigate to="/login" className="link">
                            Login In
                        </Link>
                        <button disabled={!isFormValid}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignUp;
