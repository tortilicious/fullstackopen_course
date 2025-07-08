import Response from "./Response.jsx";
import { useState } from "react";

const FilteredListResponse = ({filteredListOfCountries}) => {

  const [selectedCountry, setSelectedCountry] = useState(null);


  const onClickHandler = (country) => {
    setSelectedCountry(country)
  }

  if (selectedCountry) {
    return (
        <Response country={selectedCountry} />
    )
  }

  return (
      <div>
        {filteredListOfCountries.map((country) => (
            <div key={country.cca3}>
              {country.name.common} <button onClick={() => onClickHandler(country)}>Show</button>
            </div>
        ))}

      </div>
  )
}

export default FilteredListResponse