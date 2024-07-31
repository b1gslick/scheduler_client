import InputForm, { InputFromProps } from "../components/input_form/InputForm";

const Registration = () => {
  const registration = (event: any) => {
    event.preventDefault();
    console.log(event.target.uname.value);
    console.log(event.target.psw.value);
    console.log(event.target.confirm.value);
  };
  const props: InputFromProps = {
    buttonName: "Registration",
    callback: registration,
    datatestid: "registration",
  };
  return (
    <div>
      <h1>Scheduler</h1>
      <InputForm {...props} />
    </div>
  );
};

export default Registration;
