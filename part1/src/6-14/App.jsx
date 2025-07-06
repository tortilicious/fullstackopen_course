import {useState} from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <Header text="give feedback"/>
        <div>
          <Button text="good" onClick={() => setGood(good + 1)}/>
          <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
          <Button text="bad" onClick={() => setBad(bad + 1)}/>
        </div>
        <Header text="statistics"/>
        <Result text="good" number={good}/>
        <Result text="neutral" number={neutral}/>
        <Result text="bad" number={bad}/>

      </div>)
}

const Header = ({text}) => {
  return (<h1>{text}</h1>)
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const Result = ({text, number}) => {
  return (
      <div>{text} {number}</div>
  )
}


export default App