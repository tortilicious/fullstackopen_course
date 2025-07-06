import Person from "./Person.jsx";
import Title from "./Title.jsx";

const Numbers = ({persons, filter}) => {
  return (
      <div>
        <Title text="Numbers"/>
        {persons
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person => (
                <Person key={person.name} name={person.name} phoneNumber={person.number}/>
            ))
        }
      </div>
  )
}

export default Numbers