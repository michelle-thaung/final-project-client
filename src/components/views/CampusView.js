/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { unenrollStudent, enrollStudent } from "../../store/actions/actionCreators";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, unenrollStudent } = props;
  const campus_id = campus.id;
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <div style={{backgroundColor:"white", paddingTop:"2em", paddingBottom:"2em", marginRight:"10em", marginLeft:"10em"}}>
      <img
          src={campus.imageurl || "https://www.zillowstatic.com/bedrock/app/uploads/sites/26/shutterstock_262043447-dedc70.jpg"}  // Use default if imageUrl is falsy
          style={{ maxWidth: '100%', maxHeight: '200px' }}  // Adjust styling as needed
        />
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <div style={{ marginTop: '1em' }}>
      <Link to={`/editcampus/${campus.id}`}>
          <Button style={{ color: "white", backgroundColor: "grey", marginRight:"0.5em" }}>Edit Campus</Button>
        </Link>
        <Button style={{color:"white", backgroundColor:"coral"}}onClick={() => deleteCampus(campus.id)}>Delete Campus</Button>
      </div>
      <h3>Total Students Enrolled: {campus.students.length}</h3>
      {/* Table for student information, only display if there are students enrolled */}
      {campus.students.length > 0 && (
        <div style={{ marginBottom:"0.85em", paddingLeft:"2em", paddingRight:"2em", overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black' }}>Student Name</th>
                <th style={{ border: '1px solid black' }}>Enroll/Unenroll</th> 
              </tr>
            </thead>
            <tbody>
              {campus.students.map(student => (
                <tr key={student.id}>
                  <td style={{ border: '1px solid black' }}>
                    <Link to={`/student/${student.id}`}>{student.firstname} {student.lastname}</Link>
                  </td>
                  <td style={{ border: '1px solid black' }}>
                    <Button style={{ color: "white", backgroundColor: "coral" }} onClick={() => unenrollStudent(student)}>Unenroll</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link to={{
        pathname: `/:id/enrollnew`,
        query: {campus_id}
        }}>
        <Button style={{color:"white", backgroundColor:"teal"}}>Enroll New Student</Button>
      </Link>
      <br></br>
      <br></br>
      <Link to={{
        pathname: `/enrollexisting`,
        query: {campus_id}
      }}>
          <Button style={{color:"white", backgroundColor:"teal"}}>Enroll Existing Student</Button>
      </Link>
      </div>
    </div>
  );
};

export default CampusView;