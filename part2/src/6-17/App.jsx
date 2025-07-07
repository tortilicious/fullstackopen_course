import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Form from "./components/Form.jsx";
import Numbers from "./components/Numbers.jsx";
import Notification from "./components/Notification.jsx"
import personService from "./services/PersonService.js";
import '../index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newAlertMessage, setNewAlertMessage] = useState(null)
  const [newAlertClassName, setNewAlertClassName] = useState(null)

  // cargamos los datos de la base de datos al navegador. '[]' garantiza que solo se ejecute una vez en lugar de cada renderizado
  useEffect(() => {
    personService
        .getAll()
        .then(response => {
          setPersons(response)
        })
  }, [])

  const showNotification = (message, type) => {
    setNewAlertMessage(message)
    setNewAlertClassName(type)

    setTimeout(() => {
      setNewAlertMessage(null)
      setNewAlertClassName(null)
    }, 2500)
  }


// ✅ Versión más clara
  const addNewPerson = (event) => {
    event.preventDefault()

    // Validación básica
    if (newName.trim() === '' || newNumber.trim() === '') {
      showNotification(
          'Name and number are required',
          'error')
      return
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      // Persona existe
      if (existingPerson.number === newNumber) {

        showNotification(
            'This person with this number already exists',
            'error')
        return
      }

      // Persona existe pero con número diferente
      if (window.confirm(`${existingPerson.name} already exists. Replace the old number?`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        personService
            .update(existingPerson.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(p => p.id === existingPerson.id ? response : p))
              setNewName('')
              setNewNumber('')

              showNotification(
                  'Updated phone number',
                  'success')
            })
      }
    } else {
      // Persona nueva
      personService
          .create({name: newName, number: newNumber})
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')

            showNotification(
                'Added new person to the list.',
                'success'
            )
          })
    }
  }

  const handleDeletePerson = (person) => {

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
          .remove(person.id)
          .then(() => {
            const newPersons = persons.filter(p => p.id !== person.id)
            setPersons(newPersons)
          })

          .catch(() => {
            // Actualizamos la memoria del navegador con la lista actualizada de personas
            setPersons(persons.filter(p => p.id !== person.id))
            showNotification(
              `Error: ${person.name} was already removed from the server.`,
              'error')
              }
          )
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
    <Notification message={newAlertMessage} className={newAlertClassName}/>
    <Filter
        filterValue={newFilter}
        filterHandler={handleFilterChange}/>
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