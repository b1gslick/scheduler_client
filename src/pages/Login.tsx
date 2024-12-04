import { useContext } from "react";
import InputForm, { InputFromProps } from "../components/input_form/InputForm";
import { AuthContext } from "../context";
import { AuthContextType } from "../global";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const login = (event: any) => {
    event.preventDefault();
    setIsAuth(true);
    navigate("/");
  };

  const props: InputFromProps = {
    buttonName: "Login",
    datatestid: "login",
    callback: login,
  };
  return (
    <div>
      <h1>Scheduler</h1>
      <InputForm {...props} />
    </div>
  );
};

export default Login;
