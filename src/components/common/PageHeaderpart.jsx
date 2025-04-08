import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';

const PageHeaderpart = ({ items, pageTitle, setSearch, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <main className="flex flex-col lg:flex-row justify-between items-start lg:items-center my-2 p-5 w-full gap-4 bg-white rounded-xl shadow-md ">
      {/* Title & Breadcrumbs */}
      <nav className="text-left text-[#424242] md:font-[350] capitalize">
        <h1 className="text-secondary text-xl md:text-4xl mb-3 lg:mb-0 w-full lg:w-auto font-semibold">
          {pageTitle}
        </h1>
        <ol className="list-none p-0 inline-flex flex-wrap">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">›</span>}
              <a
                href={item.href}
                className={`${
                  currentPath === item.href
                    ? "text-[#424242] font-semibold"
                    : "text-[#848484]"
                } hover:text-[#424242] lg:text-lg`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="">
  {children}
</div>

    </main>
  );
};

export default PageHeaderpart;
