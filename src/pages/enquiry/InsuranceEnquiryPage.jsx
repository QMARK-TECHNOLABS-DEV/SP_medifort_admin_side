

import React, { useEffect, useState } from 'react';
import EnquiryTableFilter from '../../components/enquiry/EnquiryTableFilter';
import { TableData } from '../../data/TableData';
import EnquiryTable from '../../components/enquiry/EnquiryTable';
import InsuranceEnquiryTop from '../../components/enquiry/InsuranceEnquiryTop';
import { inquiryRoute } from '../../utils/Endpoint';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const InsuranceEnquiryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9; // Number of items per page
  const totalItems = TableData.length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter and paginate the data
  // const filteredData = TableData.filter(
  //   (item) =>
  //     item.Name.toLowerCase().includes(searchQuery) ||
  //     item.City.toLowerCase().includes(searchQuery) ||
  //     item.Service.toLowerCase().includes(searchQuery)
  // );

  const [filteredData, setFilteredData] = useState([]);

  const axiosPrivate = useAxiosPrivate()

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(`${inquiryRoute}?type=insurance`)

      if (response?.status === 200) {
        console.log(response?.data?.inquiries)
        setFilteredData(response?.data?.inquiries)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

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
      <InsuranceEnquiryTop
        onSearchChange={handleSearchChange}
      />
      <section>
        <EnquiryTableFilter
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </section>
      <EnquiryTable data={paginatedData} />
    </div>
  );
};

export default InsuranceEnquiryPage;


