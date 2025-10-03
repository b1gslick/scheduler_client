import { useAuth } from "../hooks/auth";
import { useHttpClient } from "./useHttpClient";

export const useTimerService = () => {
  const { post: startPost } = useHttpClient({ endpoint: "/timer/start" });
  const { post: stopPost } = useHttpClient({ endpoint: "/timer/stop" });
  const auth = useAuth();
  const authHeader = { Authorization: auth?.cookies.token };

  const start = async (id: number): Promise<null | number> => {
    return startPost({ header: authHeader, endpoint: `/${id}` });
  };

  const stop = async (id: number): Promise<null> => {
    return stopPost({ header: authHeader, endpoint: `/${id}` });
  };

  return { start, stop };
};
