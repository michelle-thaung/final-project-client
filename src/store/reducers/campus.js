/*==================================================
/src/store/reducers/campus.js

This is a Reducer function that accepts 2 parameters: the previous state object (aka current state) and an action object. 
Depending on the Action object, the Reducer updates the State and return the new State object.
It also defines the State and its default initial value.
================================================== */
import { DELETE_CAMPUS, FETCH_CAMPUS, ENROLL_NEW_STUDENT, ENROLL_EXISTING_STUDENT, UNENROLL_STUDENT } from "../actions/actionTypes";  // Import Action Type

// Define default Initial State
const initialState = {
  students: [],  // Empty students array
};

// REDUCER:
const campus = (state = initialState, action) => {  // Use "initialState" as default Initial State
  switch (action.type) {
    case FETCH_CAMPUS:
      return action.payload;
      // return state.filter(campus => campus.id!==action.payload);
    case DELETE_CAMPUS:
      return {
        ...state,
        students: state.students.filter(student => student.campusId !== action.payload),
      };
    case ENROLL_NEW_STUDENT:
      // Assuming action.payload contains the enrolled student data
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case ENROLL_EXISTING_STUDENT:
      // Assuming action.payload contains { studentId, newCampusId }
      const { studentId, newCampusId } = action.payload;
      return {
        ...state,
        students: state.students.map(student =>
          student.id === studentId ? { ...student, campusId: newCampusId } : student
        ),
      };
    case UNENROLL_STUDENT:
      // Assuming action.payload contains the unenrolled student id
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    default:
      // If the Reducer doesn't recognize the Action Type, returns the previous (current) State unchanged.
      return state;
  }
};

export default campus;