import { Link } from 'react-router-dom';
import "../HomePage.scss";
const BackToHome: React.FC = () => {
  return (
    <div>
      <Link to="/" className="go-back-home-link">Home</Link>
    </div>
  );
};

export default BackToHome;