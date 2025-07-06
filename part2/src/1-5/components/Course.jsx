import Part from "./Part.jsx";
import Header from "./Header.jsx";
import Total from "./Total.jsx";

const Course = ({course}) => {
  const sumOfExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);


  return (
      <div>
        <Header name={course.name}/>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <Total sumOfExercises={sumOfExercises} />
      </div>
  )
}

export default Course