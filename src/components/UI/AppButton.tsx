import "./AppButton.css";

interface ButtonProps {
  onClick: (e: any) => void;
  name?: string;
  children: any;
}

const AppButton = (props: ButtonProps) => {
  return (
    <button className="AppButton" {...props}>
      {props.children}
    </button>
  );
};

export default AppButton;
