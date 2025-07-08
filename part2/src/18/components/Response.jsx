import Header from "./Header.jsx";
import Language from "./Language.jsx";
import Flag from "./Flag.jsx";

const Response = ({country}) => {
  return (
      <div>
        <Header country={country} />
        <Language country={country} />
        <Flag country={country} />
      </div>
  )
}

export default Response;