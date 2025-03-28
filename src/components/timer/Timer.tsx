import { NoteProps } from "../notes/Note";
import { useEffect, useState } from "react";
import "./Timer.css";
import {
  faCheckCircle,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import NoteButton from "../UI/NoteButton";
import { useTimer } from "../../hooks/timer_state";

type timerProps = {
  note: NoteProps;
};

const Timer = (props: timerProps) => {
  let { time, setTimer } = useTimer();
  const [isPlay, setPlay] = useState(false);
  const [isFinish, setFinish] = useState(props.note.isFinish);

  const editNote = () => {
    const note = {
      ...props.note,
      time: Math.max(Math.floor((time % 3600) / 60), 0),
    };
    props.note.edit(note);
  };

  const changeTime = () => {
    time--;
    setTimer(time);
  };

  useEffect(() => {
    let timer: any = null;
    if (isPlay && time > 0) {
      timer = setInterval(() => {
        changeTime();
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });

  const hours = Math.max(Math.floor(time / 3600), 0);
  const minutes = Math.max(Math.floor((time % 3600) / 60), 0);
  const seconds = Math.max(Math.floor(time % 60), 0);

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
          {/* <li className="doubleColomn">:</li> */}
          <li>
            <span id="minutes" data-testid="timer-minutes">
              {minutes < 10 ? "0" + minutes : minutes}
            </span>
            <div className="clock-text">minutes</div>
          </li>
          {/* <li className="doubleColomn">:</li> */}
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
            onClick={() => {
              editNote();
              setPlay(false);
            }}
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
          onClick={() => {
            editNote();
            setFinish(true);
            setPlay(false);
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
