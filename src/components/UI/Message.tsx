import "./Message.css";

export type MessageProps = {
  text: string;
  type: "info" | "success" | "warning" | "error";
};

const Message = (props: MessageProps) => {
  return <div className={props.type}>{props.text}</div>;
};

export default Message;
