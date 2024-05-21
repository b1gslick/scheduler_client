import { NoteProps } from "../notes/Note";
import { useEffect, useState } from "react";
import "./Timer.css";
import {
  faCheckCircle,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import NoteButton from "../UI/NoteButton";

type timerProps = {
  note: NoteProps;
};

const Timer = (props: timerProps) => {
  const [time, setTime] = useState(props.note.time * 60);
  const [isPlay, setPlay] = useState(false);
  const [isFinish, setFinish] = useState(props.note.isFinish);

  useEffect(() => {
    let timer: any = null;
    if (isPlay) {
      timer = setInterval(() => {
        setTime((time: number) => time - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });
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
        {isFinish ? (
          <></>
        ) : isPlay ? (
          <NoteButton
            id="timer-button"
            icon={faPauseCircle}
            onClick={() => setPlay(false)}
          />
        ) : (
          <NoteButton
            id="timer-button"
            icon={faPlayCircle}
            onClick={() => {
              setPlay(true);
            }}
          />
        )}

        <NoteButton
          id="timer-button"
          icon={faCheckCircle}
          onClick={() => setFinish(true)}
        />
      </div>
    </div>
  );
};

export default Timer;
