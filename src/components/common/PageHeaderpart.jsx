import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';

const PageHeaderpart = ({ items, pageTitle, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <main className="flex flex-col sticky lg:flex-row lg:justify-between items-start lg:items-center my-2 p-5 w-full gap-2 lg:gap-4 bg-white rounded-xl shadow-md mb-5 md:mb-7">
      {/* Title & Breadcrumbs */}
      <nav className="text-left text-[#424242] md:font-[350] capitalize">
        <h1 className="text-left text-xl lg:text-3xl text-[#424242] font-semibold">
          {pageTitle}
        </h1>
        <ol className="list-none p-0 inline-flex flex-wrap">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">›</span>}
              <a
                href={item.href}
                className={`${currentPath === item.href
                    ? "text-[#424242] font-semibold"
                    : "text-[#848484]"
                  } hover:text-[#424242] text-sm`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="w-full md:w-fit">
        {children}
      </div>

    </main>
  );
};

export default PageHeaderpart;
