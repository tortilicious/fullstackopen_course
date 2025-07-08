
const CountryHeader = ({country}) => {
  return (
      <div>
        <h1>{country.name.common}</h1>
        <br/>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area} m2</p>
      </div>
  )
}


export default CountryHeader