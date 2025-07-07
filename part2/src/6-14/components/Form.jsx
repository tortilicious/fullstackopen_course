import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Title from "./Title.jsx";

const Form = ({onSubmit, onChangeName, onChangeNumber, newName, newNumber}) => {
  return (
      <div>
        <Title text="Add a new"/>
        <form onSubmit={onSubmit}>
          <Input text="name" onChange={onChangeName} value={newName}/>
          <Input text="number" onChange={onChangeNumber} value={newNumber}/>
          <Button text="add" type="submit"/>
        </form>
      </div>
  )
}

export default Form