import { useState } from "react";
import InputForm, { InputFromProps } from "../components/input_form/InputForm";
import Message from "../components/UI/Message";
import { useAutchService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export type RegistrationForm = {
  email: string;
  password: string;
};

const Registration = () => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const { registration } = useAutchService();
  const navigate = useNavigate();

  const registrationHandle = (event: any) => {
    event.preventDefault();
    const name = event.target.uname.value;
    const psw = event.target.psw.value;
    const confirm = event.target.confirm.value;

    if (!name || name.length < 3) {
      setMessage({ type: "error", text: "Name is not correct" });
      return;
    }

    if (psw.length < 8) {
      setMessage({ type: "error", text: "Password to short" });
      return;
    }

    if (psw !== confirm) {
      setMessage({
        type: "error",
        text: "Password and confirmation are not equals",
      });
      return;
    }

    const props: RegistrationForm = {
      email: name,
      password: psw,
    };
    setMessage({ type: "", text: "" });

    registration(props).then((message) => {
      // @ts-ignore
      if (message.status === "Account created") {
        // @ts-ignore
        setMessage({ type: "success", text: message.status });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage({ type: "error", text: message.toString() });
      }
    });
  };
  const props: InputFromProps = {
    buttonName: "Registration",
    callback: registrationHandle,
    datatestid: "registration",
  };
  return (
    <div>
      <h1>Scheduler</h1>
      <InputForm {...props} />
      {message.text ? (
        <Message type={message.type as any} text={message.text} />
      ) : null}
    </div>
  );
};

export default Registration;
