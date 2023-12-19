import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import { EditCampusView } from "../views";
import { Redirect } from 'react-router-dom';

class EditCampusContainer extends Component {
  // Get student data from back-end database
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
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
    let {campus} = this.props; 
    
    campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageurl: this.state.imageurl,
        id: campus.id
    };

    // Edit campus
    await this.props.editCampus(campus);
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
        <EditCampusView
          campus={this.props.campus}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {this.state.redirect && (
            <Redirect to={`/campuses`} />
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);