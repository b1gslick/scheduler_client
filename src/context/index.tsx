import { useState, createContext } from "react";
import { AuthContextType } from "../global";

interface Props {
  children: React.ReactNode;
}

interface TimerContextInterface {
  time: number;
  setTimer: (value: number) => void;
}

export const TimerContext = createContext<TimerContextInterface | undefined>(
  undefined,
);

export const TimerProvider: React.FC<Props> = ({ children }) => {
  const [time, setTime] = useState(0);
  const setTimer = (value: number) => setTime(value);
  return (
    <TimerContext.Provider value={{ time, setTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
