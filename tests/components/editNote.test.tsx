import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import EditNote, { EditNoteProps } from "../../src/components/notes/EditNote";
import { NoteProps } from "../../src/components/notes/Note";

describe("Edit note tests", () => {
  it("after press button, function edit calls if value changed", async () => {
    const edit = jest.fn();
    const { getByTestId } = renderEdit({ edit: edit });
    fireEvent.change(getByTestId("edit-title"), {
      target: { value: "new value" },
    });
    expect(getByTestId("edit-title")).toHaveAttribute("value", "new value");
    fireEvent.click(getByTestId("save-button"));
    expect(edit).toHaveBeenCalled();
  });

  it("should not fail any accessibility tests", async () => {
    const { container } = renderEdit();
    expect(await axe(container)).toHaveNoViolations();
  });
});

const renderEdit = (forChange?: any) => {
  const note: NoteProps = {
    id: 0,
    title: "test",
    description: "testshorttext",
    time: 10,
    isFinish: false,
  };
  const props: EditNoteProps = {
    ...forChange,
    edit: () => {},
    note: note,
  };
  return render(<EditNote {...props} />);
};
