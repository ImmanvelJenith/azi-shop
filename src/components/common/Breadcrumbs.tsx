import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="bg-gray-100 py-2 px-4">
      <div className="container mx-auto">
        <Link to="/">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <span key={name}> / {name}</span>
          ) : (
            <span key={name}> / <Link to={routeTo}>{name}</Link></span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
