import useInput from "../hooks/use-input";
import "./SignUp.css";

const BasicForm = (props) => {
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
  };

  const userClass = userHasError ? "form-control invalid" : "form-control";
  const passClass = passHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="signup-box">
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
              <p className="error-text">Enter valid first name</p>
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
              <p className="error-text">Enter valid last name</p>
            )}
          </div>
          <div className="form-actions">
            <button disabled={!isFormValid}>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
