import {useState} from 'react'

//  Anecdotes exercise

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const maxVotedAnecdote = votes.indexOf(Math.max(...votes))
  const hasVotes = Math.max(...votes) > 0

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    // console.log(anecdotes[randomIndex])
    setSelected(randomIndex)
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    // console.log(`indice ${selected}, votos ${copy[selected]}`)
  }


  return (
      <div>
        <Title text="Anecdote of the day"/>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>

        <div>
          <Button onClick={addVote} text="vote"/>
          <Button onClick={getRandomAnecdote} text="next anecdote"/>
        </div>

        <Title text="Anecdote with most votes"/>
        {hasVotes ? (<p>{anecdotes[maxVotedAnecdote]}</p>)
            : (<p>No votes yet</p>)
        }
      </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>
const Title = ({text}) => <h1>{text}</h1>


export default App