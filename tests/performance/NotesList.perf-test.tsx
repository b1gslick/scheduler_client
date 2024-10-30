import { measurePerformance } from "reassure";
import NotesLists from "../../src/components/notes_list/NotesLists";
import { TimerProvider } from "../../src/context";

test.each([1, 10, 100])(
  "Notes List render with %i notes",
  async (index) => {
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

    for (let i = 1; i < index; i++) {
      note.id = i;
      noteListProps.notes.push(note);
    }

    await measurePerformance(
      <TimerProvider>
        <NotesLists {...noteListProps} />
      </TimerProvider>,
    );
  },
  50000,
);
