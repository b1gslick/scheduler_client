import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import EditNote, { EditNoteProps } from "../../src/components/notes/EditNote";
import { NoteProps } from "../../src/components/notes/Note";

describe("Edit note tests", () => {
  type testEdit = {
    locator: string;
    value: string | number;
    expected: string;
  };
  it.each<testEdit>([
    {
      locator: "edit-title",
      value: "new value",
      expected: "new value",
    },
    {
      locator: "edit-time",
      value: 1,
      expected: "1",
    },
  ])(
    "Can edit $locator, expect in the field we have $expected",
    async ({ locator, value, expected }) => {
      const edit = jest.fn();
      const { getByTestId } = renderEdit({ edit: edit });
      fireEvent.change(getByTestId(locator), {
        target: { value: value },
      });
      expect(getByTestId(locator)).toHaveAttribute("value", expected);
      fireEvent.click(getByTestId("save-button"));
      expect(edit).toHaveBeenCalled();
    },
  );
  it("Can edit description, expect in the fiels new value", async () => {
    const edit = jest.fn();
    const { getByTestId } = renderEdit({ edit: edit });
    fireEvent.change(getByTestId("edit-descr"), {
      target: { value: "new value" },
    });
    expect(getByTestId("edit-descr").textContent).toContain("new value");
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
    edit: () => {},
    note: note,
    ...forChange,
  };
  return render(<EditNote {...props} />);
};
