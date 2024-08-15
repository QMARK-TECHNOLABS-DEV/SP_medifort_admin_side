import React from 'react';
import { useLocation } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="text-4xl text-gray-500 mb-4">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">›</span>}
            <a
              href={item.href}
              className={`${
                currentPath === item.href ? 'text-[#424242] font-semibold' : 'text-gray-500 font-semibold'
              } hover:text-black`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
