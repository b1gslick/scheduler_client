import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import { TimerProvider } from "./context";
import AppRoutes from "./routes/router";
import { AuthProvider } from "./hooks/auth";
import React from "react";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <AuthProvider>
            <TimerProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </TimerProvider>
          </AuthProvider>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  );
};

export default App;
