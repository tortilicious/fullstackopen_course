import {useState} from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100


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
        <Result text="all" number={total}/>
        <Result text="average" number={average}/>
        <Result text="positive" number={positive} symbol="%"/>


      </div>)
}

const Header = ({text}) => {
  return (<h1>{text}</h1>)
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const Result = ({text, number, symbol}) => {
  return (
      <div>{text} {number} {symbol}</div>
  )
}


export default App