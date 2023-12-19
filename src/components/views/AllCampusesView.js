/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

const AllCampusesView = (props) => {
  const history = useHistory()
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div>There are no campuses.</div>
        <Link to={`newcampus`}>
          <button className="bg-green button">Add New Campus</button>
        </Link>
      </div>
    );
  }

  console.log(props.allCampuses)
  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div class="card" key={campus.id} style={{ margin: "50px auto" }}>
          <div class="title">
            {campus.imageUrl && <img src={campus.imageUrl} style={{ width: '200px', height: '200px' }} alt="" />}
            <h1 onClick={() => history.push(`/campus/${campus.id}`)} style={{ cursor: "pointer" }}>{campus.name}</h1>
            <h2>campus id: {campus.id}</h2>
            <h2>{campus.address}</h2>
            <h2>{campus.description}</h2>
          </div>
          <div class="content">
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
              <button className="button bg-blue" onClick={() => {
                localStorage.setItem("CurrentCampus", JSON.stringify(campus))
                history.push(`/editCampus?id=${campus.id}`)
              }}>Edit</button>
              <button className="button bg-red" onClick={() => props.handleDelete(campus.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}

      <br />
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Link style={{ textDecoration: 'none' }} to={`/newcampus`}>
          <button className="bg-green button">Add New Campus</button>
        </Link>
      </div>

      <br /><br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;