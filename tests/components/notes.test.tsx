import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Note, { NoteProps } from "../../src/components/notes/Note";
import { axe } from "jest-axe";

describe("Test notes", () => {
  it("simple render notes", async () => {
    const { container } = renderNote();
    expect(container).not.toBeNull();
  });
  it.each<string>([
    "note-title",
    "note-desc",
    "note-timebox",
    "note-play-button",
    "note-edit-button",
    "note-delete-button",
  ])("sticker has %p", async (element: string) => {
    const { getByTestId } = renderNote();
    expect(getByTestId(element)).not.toBeNull();
  });
  type buttonCalls = { nameButton: string; expected: string };
  it.each<buttonCalls>([
    {
      nameButton: "note-play-button",
      expected: "timer-modal",
    },
    {
      nameButton: "note-edit-button",
      expected: "edit-modal",
    },
  ])(
    "$$nameButton button call modal window with $$expected",
    async ({ nameButton, expected }) => {
      const { getByTestId } = renderNote();
      const modal = getByTestId(expected);
      expect(modal).not.toHaveClass("active");
      const button = getByTestId(nameButton);
      fireEvent.click(button);
      expect(modal).toHaveClass("active");
    },
  );

  it("delete button delete element from DOM", async () => {
    const remove = jest.fn();
    const { getByTestId } = renderNote({ remove: remove });
    fireEvent.click(getByTestId("note-delete-button"));
    expect(remove).toHaveBeenCalled();
  });
  it("should not fail any accessibility tests", async () => {
    const { container } = renderNote();
    expect(await axe(container)).toHaveNoViolations();
  });
});

const renderNote = (props?: any) => {
  const note: NoteProps = {
    ...props,
    id: 0,
    title: "test",
    description: "testshorttext",
    time: 10,
    isFinish: false,
  };
  return render(<Note {...note} />);
};
