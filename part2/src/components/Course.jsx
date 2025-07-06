import Part from "./Part.jsx";

const Course = ({course}) => {
  return (
      <ul>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </ul>
  )
}

export default Course