/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div style={{paddingTop:"1em"}}>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <Button style={{color:"white", backgroundColor:"grey"}}>Add New Student</Button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
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
              <br/>
              <br/>
              <hr/>
            </div>
          );
        }
      )}
      <br/>
      <Link to={`/newstudent`}>
        <Button style={{color:"white", backgroundColor:"grey"}}>Add New Student</Button>
      </Link>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;