import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'carbon-components-react';
import 'carbon-components/css/carbon-components.min.css';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home-page-container">
      <h1 className="bx--type-expressive-heading-01">Task Manager</h1>

      <div className="links-container">
        <div className="link-item">
          <Link to="/tasks">
            <Button className="bx--btn bx--btn--primary">Go to Tasks</Button>
          </Link>
        </div>

        <div className="link-item">
          <Link to="/employees">
            <Button className="bx--btn bx--btn--primary">Go to Employees</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
