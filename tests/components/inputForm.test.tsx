import { fireEvent, render } from "@testing-library/react";
import InputForm, {
  InputFromProps,
} from "../../src/components/input_form/InputForm";

import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";

describe("Test input form", () => {
  test("input form should render with button name and datatest id", async () => {
    const inputProps: InputFromProps = {
      buttonName: "Test",
      datatestid: "test",
      callback: jest.fn(),
    };
    const { getByTestId, getByText } = renderLoginForm(inputProps);

    expect(getByTestId(inputProps.datatestid)).toBeInTheDocument();
    expect(getByText(inputProps.buttonName)).toBeInTheDocument();
  });

  test("Submit button should call callback from props", async () => {
    const inputProps: InputFromProps = {
      buttonName: "Test",
      datatestid: "test",
      callback: jest.fn((e) => e.preventDefault()),
    };
    const { getByText } = renderLoginForm(inputProps);
    fireEvent.click(getByText(inputProps.buttonName));
    expect(inputProps.callback).toHaveBeenCalled();
  });

  test("if path !== registration form should have link to registration", async () => {
    const { container } = renderLoginForm();
    expect(container.querySelector(".registration")).toBeInTheDocument();
  });

  test("if path == registration form has additional password field", async () => {
    const inputProps: InputFromProps = {
      buttonName: "Test",
      datatestid: "test",
      callback: jest.fn(),
    };
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[{ pathname: "/registration" }]}>
        <InputForm {...inputProps}></InputForm>
      </MemoryRouter>,
    );
    expect(getByTestId("login_confirm")).toBeInTheDocument();
  });

  test("should not fail any accessibility tests", async () => {
    const { container } = renderLoginForm();
    expect(await axe(container)).toHaveNoViolations();
  });
});

const renderLoginForm = (forChange?: any) => {
  const inputProps: InputFromProps = {
    buttonName: "Test",
    datatestid: "test",
    callback: jest.fn(),
    ...forChange,
  };
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/" }]}>
      <InputForm {...inputProps}></InputForm>
    </MemoryRouter>,
  );
};
