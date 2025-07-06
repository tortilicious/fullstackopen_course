import {useState} from 'react'
import Person from "./components/Person.jsx";
import Input from "./components/Input.jsx";
import Button from "./components/Button.jsx";
import Title from "./components/Title.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)

    if (newName.trim() !== '' && newNumber.trim() !== '') {
      if (nameExists) {
        alert(`"${newName}" is already added to phonebook`)
      } else {
        setPersons(persons.concat({name: newName, number: newNumber}))
        console.log('New person added: ', newName)
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (<div>
    <Title text="Phonebook"/>
    <Input text="filter shown with" onChange={handleFilterChange} value={newFilter}/>

    <Title text="Add a new"/>
    <form onSubmit={addNewPerson}>
      <Input text="name" onChange={handleNameChange} value={newName}/>
      <Input text="number" onChange={handlePhoneChange} value={newNumber}/>
      <Button text="add" type="submit"/>
    </form>
    <Title text="Numbers"/>
    {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person => (
            <Person key={person.name} name={person.name} phoneNumber={person.number}/>
        ))
    }
  </div>)
}

export default App