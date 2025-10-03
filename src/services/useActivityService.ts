import { NoteProps } from "../components/notes/Note";
import { useAuth } from "../hooks/auth";
import { CustomRequestProps, useHttpClient } from "./useHttpClient";

export const useActivityService = () => {
  const { get, post, put, del } = useHttpClient({ endpoint: "/activity" });
  const auth = useAuth();
  const authHeader = { Authorization: auth?.cookies.token };

  const getAllNotes = async (): Promise<Array<NoteProps>> => {
    return get<Array<NoteProps>>({ header: authHeader });
  };

  const addNotes = async (body: NoteProps): Promise<NoteProps> => {
    const request: CustomRequestProps = {
      body,
      header: authHeader,
    };
    return post<NoteProps>(request);
  };

  const editNotes = async (id: number, body: NoteProps): Promise<NoteProps> => {
    const request: CustomRequestProps = {
      body,
      endpoint: `/${id}`,
      header: authHeader,
    };
    return put<NoteProps>(request);
  };

  const delteNote = async (id: number) => {
    const request: CustomRequestProps = {
      endpoint: `/${id}`,
      header: authHeader,
    };
    return del<void>(request);
  };

  return { getAllNotes, addNotes, editNotes, delteNote };
};
