import {useState} from 'react'
import Person from "./components/Person.jsx";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)

    if (newName.trim() !== '') {
      if (nameExists) {
        alert(`"${newName}" is already added to phonebook`)
      } else {
        setPersons(persons.concat({name: newName, id : Date.now()}))
        console.log('New person added: ', newName)
        setNewName('')
      }
    }
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