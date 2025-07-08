import Header from "./CountryHeader.jsx";
import Language from "./Language.jsx";
import Flag from "./Flag.jsx";
import Weather from "./Weather.jsx";

const Response = ({country}) => {

  return (
      <div>
        <Header country={country} />
        <Language country={country} />
        <Flag country={country} />
        <Weather country={country} />
      </div>
  )
}

export default Response;