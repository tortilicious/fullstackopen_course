

const FilteredListResponse = ({filteredListOfCountries}) => {
  return (
      <div>
        {filteredListOfCountries.map((country) => (
            <p key={country.cca3}>{country.name.common}</p>
        ))}
      </div>
  )
}

export default FilteredListResponse