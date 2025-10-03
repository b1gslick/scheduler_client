import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAutchService } from "../../services/authService";
import { AuthContextType } from "../../global";
import Message from "../../components/UI/Message";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const { login } = useAutchService();
  const [message, setMessage] = useState({ type: "", text: "" });

  const auth = async ({ email, password }) => {
    const res = await login({ email: email, password });
    // @ts-ignore
    if (res.token) {
      // @ts-ignore
      setCookies("token", res.token);
      navigate("/");
    }
    // @ts-ignore
    setMessage({ type: "error", text: answer.errorMsg });
  };

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const value = useMemo(() => ({ cookies, auth, logout }), [cookies]);

  return (
    <AuthContext.Provider value={value}>
      {message.text ? (
        <Message type={message.type as any} text={message.text} />
      ) : null}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
