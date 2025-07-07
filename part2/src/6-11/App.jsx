import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Numbers from "./components/Numbers.jsx";
import personService from "./services/PersonService.js";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // cargamos los datos de la base de datos al navegador. '[]' garantiza que solo se ejecute una vez en lugar de cada renderizado
  useEffect(() => {
    personService
        .getAll()
        .then(response => {
          setPersons(response)
        })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)

    if (newName.trim() !== '' && newNumber.trim() !== '') {
      if (nameExists) {
        alert(`"${newName}" is already added to phonebook`)
      } else {
        personService
            .create({name: newName, number: newNumber})
            .then(response => {
              setPersons(persons.concat(response))
              setNewName('')
              setNewNumber('')
            })
      }
    }
  }

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
          .remove(person.id)
          .then(() => {
            console.log('Eliminando del servidor y actualizando estado')
            console.log('Personas antes del filter:', persons)

            const newPersons = persons.filter(p => p.id !== person.id)
            console.log('Personas despues del filter:', newPersons)
            setPersons(newPersons)
    })
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
    <Numbers persons={persons} filter={newFilter} handleDeletePerson={handleDeletePerson}/>
  </div>)
}

export default App