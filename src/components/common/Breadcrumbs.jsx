import React from 'react';
import { useLocation } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="ext-2xl text-left md:text-4xl text-[#424242] md:font-[350] my-5">
      <ol className="list-none p-0 inline-flex flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">›</span>}
            <a
              href={item.href}
              className={`${
                currentPath === item.href ? 'text-[#424242] font-semibold' : 'text-[#848484] '
              } hover:text-[#424242]`}
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
