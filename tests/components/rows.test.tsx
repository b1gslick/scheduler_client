import { render } from "@testing-library/react";
import Note, { NoteProps } from "../../src/components/notes/Note";
import userEvent from "@testing-library/user-event";

describe("Test rows", () => {
  it("simple render rows", async () => {
    const { container } = renderNote();
    expect(container).not.toBeNull();
  });

  it("description should be editable", async () => {
    const { getByTestId } = renderNote();
    const title = getByTestId("row-title");
    await userEvent.click(title);
    await userEvent.clear(title);
    await userEvent.keyboard("test2");
    expect(title.textContent).toBe("test2");
  });
  it("title should be editable", async () => {
    const { getByTestId } = renderNote();
    const description = getByTestId("row-desc");
    await userEvent.click(description);
    await userEvent.clear(description);
    await userEvent.keyboard("test2");
    expect(description.textContent).toBe("test2");
  });
  it("sticker has field for time", async () => {
    const { getByTestId } = renderNote();
    const timeBox = getByTestId("row-timebox");
    expect(timeBox).not.toBeNull();
  });
});

const renderNote = () => {
  const note: NoteProps = {
    id: 0,
    title: "test",
    description: "testshorttext",
    time: 10,
  };
  return render(<Note {...note} />);
};
