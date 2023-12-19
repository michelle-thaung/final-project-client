/*==================================================
AllStudentsContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";

import { 
  fetchAllStudentsThunk,
  enrollExistingStudentThunk,
  editStudentThunk
} from '../../store/thunks';

import EnrollExistingStudentView from '../views/EnrollExistingStudentView';
import { enrollExistingStudent } from '../../store/actions/actionCreators';

class EnrollExistingStudentContainer extends Component {
  // Get all students data from back-end database
  componentDidMount() {
    // this.props.fetchAllStudents();
  }

  constructor(props){
    super(props);
    this.state = {
      redirect: false, 
      redirectId: null
    };
  }


  enrollStudent = async (student_id, campus_id) => {
    // Dispatch action to edit student
    let {student} = this.props; 
    
    student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: campus_id.campus_id,
        id: student_id
    };

    // Edit student
    let newStudent = await this.props.editStudent(student);
    this.setState({
        redirect: true,
        redirectId: student.campusId
    });
  };

  // Render All Students view by passing all students data as props to the corresponding View component
  render(){
    return(
      <div>
        <Header />
        <EnrollExistingStudentView
            campus_id = {this.props.location.query} 
            students={this.props.allStudents}
            enrollStudent={this.enrollStudent}      
        />
        {this.state.redirect && (
            <Redirect to={`/campus/${this.state.redirectId}`} />
        )}
      </div>
    )
  }
}

// The following 2 input arguments are passed to the "connect" function used by "AllStudentsContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "allStudents".
const mapState = (state) => {
  return {
    allStudents: state.allStudents,  // Get the State object from Reducer "allStudents"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    editStudent: (student) => dispatch(editStudentThunk(student)),
    // enrollExistingStudent: (student) => dispatch(enrollExistingStudentThunk(student)),
  };
};

// Export store-connected container by default
// AllStudentsContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(mapState, mapDispatch)(EnrollExistingStudentContainer));