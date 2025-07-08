import Input from "./components/Input.jsx";
import {useEffect, useState} from "react";
import countryService from "./service/CountryService.js"
import FilteredResponse from "./components/FilteredResponse.jsx";

const App = () => {

  const [input, setInput] = useState('')
  const [listOfCountries, setListOfCountries] = useState([])


  //  1. Poblamos el useState con la lista de paises traida de la API
  useEffect(() => {
    countryService
        .getAllCountries()
        .then(response => {
          setListOfCountries(response)
        })
  }, [])

  const onChangeInput = (event) => {
    setInput(event.target.value)
  }



  return (
      <div>
        <Input value={input} onChange={onChangeInput} text="find countries" />
        <FilteredResponse listOfCountries={listOfCountries} input={input}/>
      </div>
  )
}

export default App