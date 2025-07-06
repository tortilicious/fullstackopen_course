import {useState} from 'react'
import Person from "./components/Person.jsx";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('Adding new person:', newName)
    setPersons(persons.concat({name: newName, id : Date.now()}))
    setNewName('')
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  return (<div>
    <h2>Phonebook</h2>
    <form onSubmit={addNewPerson}>
      <div>
        name: <input onChange={handleInputChange} value={newName}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    {persons.map(person => (
        <Person key={person.id} name={person.name}/>
    ))}
  </div>)
}

export default App