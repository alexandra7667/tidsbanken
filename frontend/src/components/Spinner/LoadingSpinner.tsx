import Spinner from 'react-bootstrap/Spinner';

//the role="status" attribute is used to inform assistive technologies (like screen readers) that the spinner is providing status information
function LoadingSpinner() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingSpinner;