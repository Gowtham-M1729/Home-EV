import useInput from "../hooks/use-input";
import "./SignUp.css";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const {
        value: userName,
        valueIsValid: userNameIsValid,
        hasError: userHasError,
        inputHandler: userInputHandler,
        onBlurHandler: usertBlurHandler,
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

    let isFormValid = false;
    if (userNameIsValid && passIsValid) isFormValid = true;

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!userNameIsValid && !passIsValid) return;

        console.log(userName, password);
        userReset();
        passReset();
        localStorage.removeItem('email');
        localStorage.setItem('email', {userName});
    };

    const userClass = userHasError ? "form-control invalid" : "form-control";
    const passClass = passHasError ? "form-control invalid" : "form-control";

    const submitHandler = async () => {
        try {
          if (!userName || !password) return;
          const response = await axios.post(
            "https://homeev.herokuapp.com/user/login",
            {
                email: userName,
                password: password
            },
            null
          );
          console.log(response);
          if(response.data)
          {
            navigate('/map')
          }
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="signup-box">
                <h3>Login</h3>
                <div className="control-group">
                    <div className={userClass}>
                        <label htmlFor="name">userName</label>
                        <input
                            type="text"
                            id="name"
                            onChange={userInputHandler}
                            onBlur={usertBlurHandler}
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
                            id="name"
                            onChange={passInputHandler}
                            onBlur={passBlurHandler}
                            value={password}
                        />
                        {passHasError && (
                            <p className="error-text">Enter valid Password</p>
                        )}
                    </div>
                    <div className="form-actions">
                        <Link to="/Sign-Up" className="link">
                            SignUp Instead
                        </Link>
                        <button disabled={!isFormValid} onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
