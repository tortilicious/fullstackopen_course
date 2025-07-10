// import {useEffect, useState} from "react";
// import personService from "../services/PersonService.js";
//
// const Info = () => {
//   const [info, setInfo] = useState(null)
//
//   useEffect(() => {
//     personService.getInfo()  // ← Usar tu servicio
//         .then(data => setInfo(data))
//         .catch(error => {
//           console.error('Error fetching info:', error)
//         })
//   }, [])
//
//   if (!info) return <div>Loading...</div>
//
//   return (
//       <div>
//         <p>Phonebook has info for {info.count} people</p>
//         <p>{new Date(info.timestamp).toString()}</p>
//       </div>
//   )
// }
//
// export default Info