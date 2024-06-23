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
    <div className="timerContainer" data-testid="timer-container">
      <div id="countdown">
        <ul>
          <li>
            <span id="hours" data-testid="timer-hours">
              {hours < 10 ? "0" + hours : hours}
            </span>
            <div className="clock-text">hours</div>
          </li>
          <li className="doubleColomn">:</li>
          <li>
            <span id="minutes" data-testid="timer-minutes">
              {minutes < 10 ? "0" + minutes : minutes}
            </span>
            <div className="clock-text">minutes</div>
          </li>
          <li className="doubleColomn">:</li>
          <li>
            <span id="seconds" data-testid="timer-seconds">
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
            <div className="clock-text">seconds</div>
          </li>
        </ul>
      </div>
      <div className="button_container" data-testid="timer-button-container">
        {isFinish ? (
          <></>
        ) : isPlay ? (
          <NoteButton
            data-testid="timer-pause"
            aria-label="pause"
            id="timer-button-pause"
            icon={faPauseCircle}
            onClick={() => setPlay(false)}
          />
        ) : (
          <NoteButton
            data-testid="timer-play"
            aria-label="play"
            id="timer-button-play"
            icon={faPlayCircle}
            onClick={() => {
              setPlay(true);
            }}
          />
        )}

        <NoteButton
          data-testid="timer-finish"
          id="timer-button-finish"
          aria-label="finish"
          icon={faCheckCircle}
          onClick={() => setFinish(true)}
        />
      </div>
    </div>
  );
};

export default Timer;
