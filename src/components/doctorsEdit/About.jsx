import React from 'react'

const About = () => {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-left mb-2 ml-4'>About</h1>
        <p className='ml-4 bg-[#B0BAC3] bg-opacity-40 w-full p-6 rounded-lg text-justify text-sm'>Dr Cherian M Thomas is an experienced orthopaedic surgeon in Mumbai, with over<br/>
         32 years of experience overall. He specialises in hip and knee replacement surgeries,<br/>
          foot injury treatment, and lower extremity wound care. His extensive experience has<br/> made him one of the best orthopaedic surgeons in Mumbai.</p>
      </div>
      <div>
      <form className=" flex flex-row ml-4">  {/* Updated max-w-sm to max-w-lg for a wider form */}
          <div className='flex flex-col mr-8'>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm text-black font-medium text-left ">Experience</label>
            <input type="text" id="name" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300  text-sm rounded-lg  p-2.5 "
               placeholder="MBBS, MS (Gen. Surgery), FMAS" style={{ width: '400px' }} required />
          </div>
          <div className="mb-5">
            <input type="text" id="qualification" className="bg-[#B0BAC3] bg-opacity-40 w-full border border-gray-300  text-sm rounded-lg block p-2.5 "
               placeholder="MBBS, MS (Gen. Surgery), FMAS" required />
          </div>
          <span className='text-left text-xs'>+ Add expertise</span>
          </div>
          <div className="mb-5">
            <div className='flex flex-col'>
            <label htmlFor="name" className="block mb-2 text-sm text-black font-medium text-left ">Areas of expertise</label>
            <input type="text" id="name" className="bg-[#B0BAC3] mb-4 bg-opacity-40 w-full border border-gray-300  text-sm rounded-lg  p-2.5 "
               placeholder="MBBS, MS (Gen. Surgery), FMAS" style={{ width: '400px' }} required />
               <span className='text-left text-xs'>+ Add expertise</span>
               </div>
          </div>
          </form>
      </div>
</div>
  )
}

export default About
