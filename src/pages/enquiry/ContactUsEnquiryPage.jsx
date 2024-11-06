

import React, { useEffect, useState } from 'react';
import EnquiryTableFilter from '../../components/enquiry/EnquiryTableFilter';
import { TableData } from '../../data/TableData';
import EnquiryTable from '../../components/enquiry/EnquiryTable';
import ContactUsEnquiryTop from '../../components/enquiry/ContactUsEnquiryTop';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { inquiryRoute } from '../../utils/Endpoint';

const ContactUsEnquiryPage = () => {
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9; // Number of items per page
  const [totalItems, setTotalItems] = useState(0)

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  const [filteredData, setFilteredData] = useState([]);

  const axiosPrivate = useAxiosPrivate()

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(`${inquiryRoute}?type=contact&search=${search}&sort=${sort}`)

      if (response?.status === 200) {
        console.log(response?.data?.inquiries)
        setFilteredData(response?.data?.inquiries)
        setTotalItems(response?.data?.total)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [search, sort])

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='w-full'>
      <ContactUsEnquiryTop
        onSearchChange={handleSearchChange}
      />
      <section>
        <EnquiryTableFilter
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          setSort={setSort}
        />
      </section>
      <EnquiryTable data={paginatedData} />
    </div>
  );
};

export default ContactUsEnquiryPage;


