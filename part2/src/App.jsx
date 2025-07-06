import Header from "./components/Header.jsx";
import Course from "./components/Course.jsx";

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const sumOfExercises = course.parts.reduce((sum, part) =>  sum + part.exercises, 0)

  return (
      <div>
        <Header name={course.name}/>
        <Course course={course}/>
        <p><strong>Total of {sumOfExercises} exercises</strong></p>
      </div>
  )
}

export default App
