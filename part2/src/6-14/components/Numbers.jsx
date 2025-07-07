import Person from "./Person.jsx";
import Title from "./Title.jsx";
import Button from "./Button.jsx";

const Numbers = ({persons, filter, handleDeletePerson}) => {

  return (
      <div>
        <Title text="Numbers"/>
        {
          persons
              .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
              .map(person => (
                  <div key={person.id}>
                    <Person key={person.name} name={person.name} phoneNumber={person.number}/>
                    <Button
                        text="delete"
                        type="button"
                        onClick={() => handleDeletePerson(person)}/>
                  </div>
              ))
        }
      </div>
  )
}

export default Numbers