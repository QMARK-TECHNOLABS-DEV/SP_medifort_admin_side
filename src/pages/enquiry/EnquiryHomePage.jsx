import React from 'react'
import EnquiryTopPart from '../../components/enquiry/EnquiryTopPart'
import EnquiriesCards from '../../components/enquiry/EnquiriesCards'

const EnquiryHomePage = () => {
  return (
    <div>
      <EnquiryTopPart title={'Enquiries'}/>
      <section>
        <EnquiriesCards/>
      </section>
    </div>
  )
}

export default EnquiryHomePage
