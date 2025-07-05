const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
      <div>
        <Header course={course}/>
        <Content parts={parts}/>
        <Total parts={parts}/>
      </div>
  )
}

const Header = props => {
  return (
      <h1>{props.course}</h1>
  )
}

const Content = props => {
  return (
      <>
        {props.parts.map(part =>
            <Part  part={part.name} exercises={part.exercises}/>
        )}

      </>
  )
}

const Part = props => {
  return (
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
  )
}

const Total = props => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
      <p>Number of exercises {totalExercises}</p>
  )
}

export default App