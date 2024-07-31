import { useLocation } from "react-router-dom";
import "./InputForm.css";

import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export type InputFromProps = {
  buttonName: string;
  datatestid: string;
  callback: any;
};

const InputForm = (props: InputFromProps) => {
  const location = useLocation();
  return (
    <div className="login_form" datatest-id={props.datatestid}>
      <form onSubmit={props.callback}>
        <FontAwesomeIcon className="form_user" icon={faUser}></FontAwesomeIcon>
        <input
          className="login_input"
          type="text"
          placeholder="Enter Login"
          name="uname"
          datatest-id="login_username"
          aria-placeholder="Email"
        ></input>
        <FontAwesomeIcon className="form_pass" icon={faLock}></FontAwesomeIcon>
        <input
          className="login_input"
          type="password"
          placeholder="Enter password"
          name="psw"
          datatest-id="login_password"
        ></input>
        {location.pathname === "/registration" ? (
          <input
            className="login_input"
            type="password"
            placeholder="Enter Confirm Password"
            name="confirm"
            datatest-id="login_confirm"
          ></input>
        ) : (
          <></>
        )}
        <button type="submit" className="form_submit">
          {props.buttonName}
        </button>
        {location.pathname !== "/registration" ? (
          <a className="registration" href="/registration">
            Don't have account?
          </a>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default InputForm;
