const Language = ({country}) => {
  return (
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))}
        </ul>
      </div>
  )
}

export default Language