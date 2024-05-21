import { render } from "@testing-library/react";
import Note, { NoteProps } from "../../src/components/notes/Note";

describe("Test notes", () => {
  it("simple render notes", async () => {
    const { container } = renderNote();
    expect(container).not.toBeNull();
  });

  it("sticker has field for time", async () => {
    const { getByTestId } = renderNote();
    const timeBox = getByTestId("note-timebox");
    expect(timeBox).not.toBeNull();
  });
});

const renderNote = () => {
  const note: NoteProps = {
    id: 0,
    title: "test",
    description: "testshorttext",
    time: 10,
    isFinish: false,
  };
  return render(<Note {...note} />);
};
