import {useState} from 'react'

// unicafe exercise
const App = () => {

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
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>)
}

const Header = ({text}) => {
  return (<h1>{text}</h1>)
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text, number, symbol}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{number} {symbol}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  if (total === 0) {
    return (
        <div>No feedback given</div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticLine text="good" number={good}/>
          <StatisticLine text="neutral" number={neutral}/>
          <StatisticLine text="bad" number={bad}/>
          <StatisticLine text="all" number={total}/>
          <StatisticLine text="average" number={average}/>
          <StatisticLine text="positive" number={positive} symbol="%"/>
        </tbody>
      </table>
  )
}


export default App