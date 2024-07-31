import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import { AuthContext } from "./context";
import { useState } from "react";
import AppRoutes from "./routes/router";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth } as any}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
