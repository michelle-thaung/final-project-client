/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <div style={{backgroundColor:"white", paddingTop:"2em", paddingBottom:"2em", marginRight:"10em", marginLeft:"10em"}}>
        <img
          src={student.imageurl || "https://www.pngfind.com/pngs/m/163-1631127_student-school-study-skills-college-test-students-pictures.png"}  // Use default if imageUrl is falsy
          style={{ maxWidth: '100%', maxHeight: '100px', borderRadius:'50%', height:'auto', maxWidth:'100%' }}  // Adjust styling as needed
        />
        <p>First Name: {student.firstname}</p>
        <p>Last Name: {student.lastname}</p>
        <p>Email: {student.email}</p>
        <p>GPA: {student.gpa}</p>
        
        {/* Only display link if student is assigned to a campus */}
        {student.campus && (
          <p>Attends:</p>
        )}
        {student.campus && (
          <Link to={`/campus/${student.campus.id}`} style={{ textDecoration: 'none' }}>
            <p><strong>{student.campus.name}</strong></p>
          </Link>
        )}

        {/* Display a text message saying student is not enrolled at a campus */}
        {!student.campus && (
          <p>{student.firstname} does not currently attend a college.</p>
        )}

      <div style={{ marginTop: '1em' }}>
        <Link to={`/editstudent/${student.id}`}>
          <Button style={{color:"white", backgroundColor:"grey", marginRight:"0.5em"}}>Edit Student</Button>
        </Link>
        <Button style={{color:"white", backgroundColor:"coral"}} onClick={() => deleteStudent(student.id)}>Delete Student</Button>
      </div>
      </div>
    </div>
  );

};

export default StudentView;