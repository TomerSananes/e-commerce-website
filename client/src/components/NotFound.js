//if path doesnt exist show this component
function NotFound() {
    return (
      <div style={{ marginTop: '150px' }}>
        <h1 style={{fontFamily:'Courier New, Courier, monospace'}}>404 - Not Found</h1>
        <h3 style={{fontFamily:'Courier New, Courier, monospace'}}>The page you are looking for does not exist.</h3>
      </div>
    );
  }
  
  export default NotFound;
  