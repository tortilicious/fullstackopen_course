import Response from "./Response.jsx";
import FilteredListResponse from "./FilteredListResponse.jsx";


const FilteredResponse = ({listOfCountries, input}) => {

  if (!input || input.length < 3) {
    return
  }

  const filteredListOfCountries = listOfCountries
      .filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))

//  No se encuentran países
  if (filteredListOfCountries.length === 0) {
    return <p>No countries found</p>
  }

//  Más de 10 países
  if (filteredListOfCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

//  Solo un país
  if (filteredListOfCountries.length === 1) {
    const country = filteredListOfCountries[0];
    return(
        <Response country={country}/>
    )
  }

//  Entre 1-10 países
  return(
      <FilteredListResponse filteredListOfCountries={filteredListOfCountries} />
  )

}

export default FilteredResponse