/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { campus } from "../../store/reducers";

const EnrollExistingStudentView = (props) => {
  const { students, campus_id, enrollStudent } = props;
  // Only display students who are not enrolled at a campus
  // const filteredStudents = students.filter(student => student.campusId === null);

  const handleEnrollClick = (studentId, campusId) => {
    // Call the enrollStudent function with studentId and campusId
    enrollStudent(studentId, campusId);
  };

  if (students.length == 0) {
    return (
      <div>
        <h3>No students to enroll!</h3>
        <Link to={`/campuses`}>
          <Button style={{color:"white", backgroundColor:"grey", marginRight:"0.5em"}}>Go Back to All Campuses</Button>
        </Link>
      </div>
    )  
  }
  // If there is at least one student, render All Students view 
  if (students.length > 0) {
    return (
      <div>
        <h1>All Students</h1>
  
        {students.map((student) => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div key={student.id}>
                <Link to={`/student/${student.id}`}>
                  <h2>{name}</h2>
                </Link>
                <img
                  src={student.imageurl || "https://www.pngfind.com/pngs/m/163-1631127_student-school-study-skills-college-test-students-pictures.png"}  // Use default if imageUrl is falsy
                  style={{ maxWidth: '100%', maxHeight: '100px', borderRadius:'50%', height:'auto', maxWidth:'100%' }}  // Adjust styling as needed
                />
                <br></br>
                <br></br>
                <Button style={{ color: 'white', backgroundColor: 'teal' }} onClick={() => handleEnrollClick(student.id, campus_id)}>
                  Enroll Student
                </Button>
                <br/>
                <br/>
                <hr/>
              </div>
            );
          }
        )}
        <br/>
        
        <br/><br/>
      </div>
    );
  }
};


export default EnrollExistingStudentView;