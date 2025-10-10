import { useState } from "react";
import InputForm, { InputFromProps } from "../components/input_form/InputForm";
import Message from "../components/UI/Message";
import { useAuth } from "../hooks/auth";

export type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const auth = useAuth();

  const loginHandle = async (event: any) => {
    event.preventDefault();
    const name = event.target.uname.value;
    const psw = event.target.psw.value;
    if (!name || !psw) {
      setMessage({ type: "error", text: "Please complete login form" });
      return;
    }
    await auth?.auth({ email: name, password: psw });
  };

  const props: InputFromProps = {
    buttonName: "Login",
    datatestid: "login",
    callback: loginHandle,
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

export default Login;
