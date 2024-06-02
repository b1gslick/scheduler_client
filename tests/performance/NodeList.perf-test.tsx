import { measurePerformance } from "reassure";
import NotesLists from "../../src/components/notes_list/NotesLists.tsx";

test("Test with scenario", async () => {
  let noteListProps = {
    notes: [
      {
        id: 0,
        title: "test",
        description: "testshorttext",
        time: 10,
        isFinish: false,
      },
    ],
    remove: jest.fn(),
    edit: jest.fn(),
  };
  const note = {
    id: 0,
    title: "test",
    description: "testshorttext",
    time: 10,
    isFinish: false,
  };
  const scenario = async () => {
    for (let i = 1; i < 10; i++) {
      note.id = i;
      noteListProps.notes.push(note);
    }
  };

  await measurePerformance(<NotesLists {...noteListProps} />, { scenario });
}, 50000);
