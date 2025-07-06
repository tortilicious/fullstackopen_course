import {useState} from 'react'
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Numbers from "./components/Numbers.jsx";

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

    <Filter filterValue={newFilter} filterHandler={handleFilterChange}/>
    <Form
        onSubmit={addNewPerson}
        newName={newName}
        onChangeName={handleNameChange}
        newNumber={newNumber}
        onChangeNumber={handlePhoneChange}/>
    <Numbers persons={persons} filter={newFilter}/>
  </div>)
}

export default App