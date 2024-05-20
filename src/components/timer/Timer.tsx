import { NoteProps } from "../notes/Note";
import { useEffect, useState } from "react";
import "./Timer.css";
import {
  faEdit,
  faPlayCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import NoteButton from "../UI/NoteButton";
import AppButton from "../UI/AppButton";

type timerProps = {
  playTimer: any;
  note: NoteProps;
};

const Timer = (props: timerProps) => {
  const [time, setTime] = useState(props.note.time * 60);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return (
    <div className="timerContainer">
      <div id="countdown">
        <ul>
          <li>
            <span id="hours">{hours < 10 ? "0" + hours : hours}</span>
            <div className="clock-text">hours</div>
          </li>
          <span className="doubleColomn">:</span>
          <li>
            <span id="minutes">{minutes < 10 ? "0" + minutes : minutes}</span>
            <div className="clock-text">minutes</div>
          </li>
          <span className="doubleColomn">:</span>
          <li>
            <span id="seconds">{seconds < 10 ? "0" + seconds : seconds}</span>
            <div className="clock-text">seconds</div>
          </li>
        </ul>
      </div>
      <div className="button_container">
        <NoteButton
          id="timer-button"
          icon={faPlayCircle}
          onClick={() => setTimerModal(true)}
        />
        <NoteButton
          id="timer-button"
          icon={faEdit}
          onClick={() => setEditModal(true)}
        />
        <NoteButton
          id="timer-button"
          icon={faTrash}
          onClick={() => props.remove?.(props)}
        />
      </div>
    </div>
  );
};

export default Timer;
