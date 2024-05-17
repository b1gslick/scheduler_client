import { render } from "@testing-library/react";
import Row, { RowPros } from "../../src/components/rows/row";
import userEvent from "@testing-library/user-event";

describe("Test rows", () => {
  it("simple render rows", async () => {
    const { container } = renderRow();
    expect(container).not.toBeNull();
  });

  it("description should be editable", async () => {
    const { getByTestId } = renderRow();
    const title = getByTestId("row-title");
    await userEvent.click(title);
    await userEvent.clear(title);
    await userEvent.keyboard("test2");
    expect(title.textContent).toBe("test2");
  });
  it("title should be editable", async () => {
    const { getByTestId } = renderRow();
    const description = getByTestId("row-desc");
    await userEvent.click(description);
    await userEvent.clear(description);
    await userEvent.keyboard("test2");
    expect(description.textContent).toBe("test2");
  });
  it("sticker has field for time", async () => {
    const { getByTestId } = renderRow();
    const timeBox = getByTestId("row-timebox");
    expect(timeBox).not.toBeNull();
  });
});

const renderRow = () => {
  const rowProps: RowPros = {
    id: 0,
    title: "test",
    description: "testshorttext",
    time: 10,
  };
  return render(<Row {...rowProps} />);
};
