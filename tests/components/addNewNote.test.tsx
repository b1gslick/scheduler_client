import { render, fireEvent } from "@testing-library/react";
import AddNote from "../../src/components/notes/AddNote";
import { axe } from "jest-axe";

describe("Test notes", () => {
  it("Add note render with empty fields", async () => {
    const create = jest.fn();
    const { getByTestId } = renderNote(create as any);
    expect(getByTestId("add-note")).toBeInTheDocument();
    expect(getByTestId("input-title").nodeValue).toBeNull();
    expect(getByTestId("input-descr").nodeValue).toBeNull();
    expect(getByTestId("input-time").nodeValue).toBeNull();
  });

  type inputTest = { field: string; value: any };

  it.each<inputTest>([
    {
      field: "input-title",
      value: "test",
    },
    {
      field: "input-descr",
      value: "test",
    },
    {
      field: "input-time",
      value: 1,
    },
  ])("Add note has editable fields $$field", async ({ field, value }) => {
    const create = jest.fn();
    const { getByTestId } = renderNote(create as any);
    const input = getByTestId(field);
    fireEvent.change(input, value);
    fireEvent.click(getByTestId("add-button"));
    console.log(input.nodeValue);
  });

  it("should not fail any accessibility tests", async () => {
    const create = jest.fn();
    const { container } = renderNote(create as any);
    expect(await axe(container)).toHaveNoViolations();
  });
});

const renderNote = ({ create }) => {
  return render(<AddNote create={create} />);
};
