import { useState, createContext } from "react";
import { AuthContextType } from "../global";

export const AuthContext = createContext<AuthContextType | null>(null);

interface TimerContextInterface {
  time: number;
  setTimer: (value: number) => void;
}

export const TimerContext = createContext<TimerContextInterface | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
}

export const TimerProvider: React.FC<Props> = ({ children }) => {
  const [time, setTime] = useState(0);
  const setTimer = (value: number) => setTime(value);
  return (
    <TimerContext.Provider value={{ time, setTimer }}>
      {children}
    </TimerContext.Provider>
  );
};