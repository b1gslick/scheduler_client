import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import Modal, { modalProps } from "../../../src/components/UI/Modal";

describe("Modal", () => {
  it("make visible", async () => {
    const { getByTestId } = renderModal({ visible: true });
    expect(getByTestId("modal")).toHaveAttribute("class", "modal active");
  });
  it("make Invisible", async () => {
    const { getByTestId } = renderModal({ visible: false });
    expect(getByTestId("modal")).toHaveAttribute("class", "modal");
  });
  it("makevisible on click", async () => {
    const makeVisible = jest.fn();
    const { getByTestId } = renderModal({
      visible: true,
      makevisible: makeVisible,
    });
    fireEvent.click(getByTestId("modal"));
    expect(makeVisible).toHaveBeenCalled();
  });

  it("click outside make invisible", async () => {
    const props: modalProps = {
      children: "",
      visible: true,
      makevisible: () => {},
    };

    render(
      <div>
        <Modal {...props} />{" "}
      </div>,
    );
    fireEvent.click(document);
  });

  it.skip("should not fail any accessibility tests", async () => {
    const { container } = renderModal({ visible: true });
    expect(await axe(container)).toHaveNoViolations();
  });
});

const renderModal = (addProps?: any) => {
  const props: modalProps = {
    children: "",
    makevisible: () => {},
    ...addProps,
  };
  return render(<Modal {...props} />);
};
