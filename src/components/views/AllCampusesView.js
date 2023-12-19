/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const AllCampusesView = (props) => {
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
    <div style={{paddingTop:"1em"}}>
      <p>There are no campuses.</p>
      <Link to={`newcampus`}>
        <Button style={{color:"white", backgroundColor:"grey"}}>Add New Campus</Button>
      </Link>
    </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>Campus ID: {campus.id}</h4>
          <img
            src={campus.imageurl || "https://www.zillowstatic.com/bedrock/app/uploads/sites/26/shutterstock_262043447-dedc70.jpg"}  // Use default if imageUrl is falsy
            style={{ maxWidth: '100%', maxHeight: '100px' }}  // Adjust styling as needed
          />
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <Button style={{color:"white", backgroundColor:"grey"}}>Add New Campus</Button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;