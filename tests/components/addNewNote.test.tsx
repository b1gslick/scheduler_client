import { render, fireEvent } from "@testing-library/react";
import AddNote, { AddNoteProps } from "../../src/components/notes/AddNote";
import { axe } from "jest-axe";

describe("Test add notes", () => {
  it("Add note render with empty fields", async () => {
    const create = jest.fn();
    const { getByTestId } = renderNote(create as any);
    expect(getByTestId("add-note")).toBeInTheDocument();
    expect(getByTestId("input-title").nodeValue).toBeNull();
    expect(getByTestId("input-descr").nodeValue).toBeNull();
    expect(getByTestId("input-time").nodeValue).toBeNull();
  });

  type inputTest = { field: string; value: any; expected: string };

  it.each<inputTest>([
    {
      field: "input-title",
      value: "test",
      expected: "test",
    },
    {
      field: "input-time",
      value: 1,
      expected: "1",
    },
  ])(
    "Add note has editable fields $$field",
    async ({ field, value, expected }) => {
      const create = jest.fn();
      const { getByTestId } = renderNote(create as any);
      const input = getByTestId(field);
      fireEvent.change(input, {
        target: { value: value },
      });
      expect(input).toHaveAttribute("value", expected);
    },
  );

  it("Add note has editable field description", async () => {
    const create = jest.fn();
    const { getByTestId } = renderNote(create as any);
    const input = getByTestId("input-descr");
    fireEvent.change(input, {
      target: { value: "new value" },
    });
    expect(input.textContent).toContain("new value");
  });

  it("Prease add call function for add note", async () => {
    const create = jest.fn();
    const props: AddNoteProps = { create: create };
    const { getByTestId } = renderNote(props);
    fireEvent.click(getByTestId("add-button"));
    expect(create).toHaveBeenCalled();
  });

  it.skip("should not fail any accessibility tests", async () => {
    const create = jest.fn();
    const { container } = renderNote(create as any);
    expect(await axe(container)).toHaveNoViolations();
  });
});

const renderNote = ({ create }) => {
  return render(<AddNote create={create} />);
};
