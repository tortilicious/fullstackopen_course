import Part from "./Part.jsx";

const Course = ({course}) => {
  return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
  )
}

export default Course