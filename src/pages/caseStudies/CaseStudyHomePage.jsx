import React from 'react'
import CaseStudyTopPart from '../../components/caseStudies/CaseStudyTopPart'
import CaseStudyCards from '../../components/caseStudies/CaseStudyCards'

const CaseStudyHomePage = () => {
  return (
    <div className='w-full'>
      <CaseStudyTopPart title={'Content management'}/>
      <section>
        <CaseStudyCards/>
      </section>
    </div>
  )
}

export default CaseStudyHomePage
