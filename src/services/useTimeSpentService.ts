import { useAuth } from "../hooks/auth";
import { CustomRequestProps, useHttpClient } from "./useHttpClient";

export type TimeSpent = {
  activity_id: number;
  id?: number;
  time: number;
};

export const useTimeSpentService = () => {
  const { get, post } = useHttpClient({ endpoint: "/time_spent" });
  const auth = useAuth();
  const authHeader = { Authorization: auth?.cookies.token };

  const getTimeSpent = async (id: number): Promise<TimeSpent> => {
    return get<TimeSpent>({ header: authHeader, endpoint: `${id}` });
  };

  const addTimeSpent = async (body: TimeSpent): Promise<TimeSpent> => {
    const request: CustomRequestProps = {
      body,
      header: authHeader,
    };
    return post<TimeSpent>(request);
  };

  return { getTimeSpent, addTimeSpent };
};
