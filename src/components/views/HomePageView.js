/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
const styles = {
  body: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0', 
  },
  centeredBox: {
    backgroundColor: 'lightgrey',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};

const HomePageView = () => {
  // Render Home page view
  return (
    <div style={styles.body}>
      <div style={styles.centeredBox}>
        <h1>Welcome to Campus Manager</h1>
        <p>You can add your college campus with its respective students here. Click on the buttons above to get started.</p>
      </div>
    </div>
  );
};


export default HomePageView;