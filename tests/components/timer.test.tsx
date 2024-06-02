import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";
import Timer from "../../src/components/timer/Timer";
import { NoteProps } from "../../src/components/notes/Note";

jest.spyOn(global, "setTimeout");
describe("Test timer", () => {
  it("timer render time", async () => {
    const { getByTestId } = renderTimer({ time: 121 });
    const hour = getByTestId("timer-hours");
    const minutes = getByTestId("timer-minutes");
    const seconds = getByTestId("timer-seconds");
    expect(hour.textContent).toContain("02");
    expect(minutes.textContent).toContain("01");
    expect(seconds.textContent).toContain("00");
  });

  it("after press play button pause is appear", async () => {
    const { getByTestId, queryByTestId } = renderTimer({ time: 121 });
    fireEvent.click(getByTestId("timer-play"));
    expect(getByTestId("timer-pause")).toBeInTheDocument();
    expect(queryByTestId("timer-play")).toBeNull();
  });

  it("after press pause button play is appear", async () => {
    const { getByTestId, queryByTestId } = renderTimer({ time: 121 });
    fireEvent.click(getByTestId("timer-play"));
    fireEvent.click(getByTestId("timer-pause"));
    expect(getByTestId("timer-play")).toBeInTheDocument();
    expect(queryByTestId("timer-pause")).toBeNull();
  });

  it("after press finish timer button are not active", async () => {
    const { getByTestId, queryByTestId } = renderTimer({ time: 121 });
    fireEvent.click(getByTestId("timer-finish"));
    expect(queryByTestId("timer-pause")).toBeNull();
    expect(queryByTestId("timer-play")).toBeNull();
  });

  it("after press play timer run", async () => {
    const { getByTestId } = renderTimer({ time: 15 });
    fireEvent.click(getByTestId("timer-play"));
    setTimeout(() => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(getByTestId("timer-minutes").textContent).toContain("14");
    }, 1000);
  });

  it("after press plause timer stop", async () => {
    const { getByTestId } = renderTimer({ time: 15 });
    fireEvent.click(getByTestId("timer-play"));
    setTimeout(() => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(getByTestId("timer-minutes").textContent).toContain("14");
    }, 1000);
    fireEvent.click(getByTestId("timer-pause"));
    const secondsValue = getByTestId("timer-seconds").textContent;
    setTimeout(() => {
      expect(getByTestId("timer-seconds").textContent).toEqual(secondsValue);
    }, 5000);
  });
  it("after press finish timer is stop", async () => {
    const { getByTestId } = renderTimer({ time: 15 });
    fireEvent.click(getByTestId("timer-play"));
    setTimeout(() => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(getByTestId("timer-minutes").textContent).toContain("14");
    }, 1000);
    fireEvent.click(getByTestId("timer-finish"));
    const secondsValue = getByTestId("timer-seconds").textContent;
    setTimeout(() => {
      expect(getByTestId("timer-seconds").textContent).toEqual(secondsValue);
    }, 5000);
  });

  it.skip("should not fail any accessibility tests", async () => {
    const { container } = renderTimer();
    expect(await axe(container)).toHaveNoViolations();
  });
});

const renderTimer = (props?: any) => {
  const note: NoteProps = {
    id: 0,
    title: "test",
    description: "testshorttext",
    time: 10,
    isFinish: false,
    ...props,
  };
  return render(<Timer note={note} />);
};
