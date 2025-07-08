const Input = ({text, onChange, value}) => {
  return (
      <div>
        {text}: <input onChange={onChange} value={value}/>
      </div>
  )
}
export default Input