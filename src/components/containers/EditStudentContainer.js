import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";
import { EditStudentView } from "../views";
import { Redirect } from 'react-router-dom';

class EditStudentContainer extends Component {
  // Get student data from back-end database
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Initialize state
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      redirect:null
    };
  }

  // Update state when input values change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  handleSubmit = async (event) => {
    event.preventDefault();

    // Dispatch action to edit student
    let {student} = this.props; 
    
    student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        id: student.id
    };

    // Edit student
    await this.props.editStudent(student);
    this.setState({
        redirect: true
    });

    // Redirect to student page after edit
    // this.props.history.push(`/student/${studentId}`);
  };

  render() {
    return (
      <div>
        <Header />
        <EditStudentView
          student={this.props.student}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {this.state.redirect && (
            <Redirect to={`/students`} />
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);