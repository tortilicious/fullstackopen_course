import {useState} from 'react'
import Person from "./components/Person.jsx";
import Input from "./components/Input.jsx";
import Button from "./components/Button.jsx";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)

    if (newName.trim() !== '' && newPhoneNumber.trim() !== '') {
      if (nameExists) {
        alert(`"${newName}" is already added to phonebook`)
      } else {
        setPersons(persons.concat({name: newName, phoneNumber: newPhoneNumber}))
        console.log('New person added: ', newName)
        setNewName('')
        setNewPhoneNumber('')
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }


  return (<div>
    <h2>Phonebook</h2>
    <form onSubmit={addNewPerson}>
      <Input text="name" onChange={handleNameChange} value={newName}/>
      <Input text="number" onChange={handlePhoneChange} value={newPhoneNumber}/>
      <Button text="add" type="submit"/>
    </form>
    <h2>Numbers</h2>
    {persons.map(person => (<Person key={person.name} name={person.name} phoneNumber={person.phoneNumber}/>))}
  </div>)
}

export default App