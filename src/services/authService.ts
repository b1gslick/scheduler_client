import { LoginForm } from "../pages/Login";
import { RegistrationForm } from "../pages/Registration";
import { CustomRequestProps, useHttpClient } from "./useHttpClient";

export const useAutchService = () => {
  const { post } = useHttpClient({ endpoint: "/" });

  const registration = async (body: RegistrationForm): Promise<Object> => {
    const request: CustomRequestProps = {
      body,
      endpoint: "registration",
    };
    return post<Object>(request);
  };

  const login = async (body: LoginForm): Promise<string> => {
    console.log(body);
    const request: CustomRequestProps = {
      body,
      endpoint: "login",
    };
    return post<string>(request);
  };

  return { registration, login };
};
