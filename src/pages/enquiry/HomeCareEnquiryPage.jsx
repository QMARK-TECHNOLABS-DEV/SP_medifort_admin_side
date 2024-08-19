import React from 'react'
import EnquiryHomeCareTop from '../../components/enquiry/EnquiryHomeCareTop'
import EnquiryTableFilter from '../../components/enquiry/EnquiryTableFilter'
import { TableData } from '../../data/TableData'
import EnquiryTable from '../../components/enquiry/EnquiryTable'

const HomeCareEnquiryPage = () => {
  const DummyTableData = TableData.map(
    ({ Name,City,Pincode,Service,Contact }) => ({
      Name,City,Pincode,Service,Contact
    })
  );
  return (
    <div className='ml-10 mr-10'>
        <EnquiryHomeCareTop title={"Enquiries"} type={{ name: "search" }}/>
      <section>
        <EnquiryTableFilter/>
      </section>
      <EnquiryTable data={DummyTableData}/>
    </div>
  )
}

export default HomeCareEnquiryPage
