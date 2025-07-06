import Title from "./Title.jsx";
import Input from "./Input.jsx";


const Filter = ({filterValue, filterHandler}) => {
  return (
      <div>
        <Title text="Phonebook"/>
        <Input text="filter shown with" value={filterValue} onChange={filterHandler} />
      </div>
  )
}

export default Filter