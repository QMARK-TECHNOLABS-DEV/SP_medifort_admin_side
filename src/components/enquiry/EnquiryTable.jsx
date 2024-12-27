import React, { useEffect, useState } from "react";
import '../../components/page.css'

const EnquiryTable = ({ data, kind }) => {

  const generalFields = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Message', key: 'message' },
  ]

  const homecareFields = [
    { label: 'Name', key: 'name' },
    { label: 'Pin', key: 'pin' },
    { label: 'City', key: 'city' },
    { label: 'Service', key: 'service' },
  ]

  const internationalFields = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Country', key: 'country' },
    { label: 'Message', key: 'message' },
  ]

  const [fields, setFields] = useState(generalFields)

  useEffect(() => {
    if (["contact", "insurance", "feedback"]?.includes(kind)) {
      setFields(generalFields)
    }
    else if (kind === 'homecare') {
      setFields(homecareFields)
    }
    else if (kind === 'international') {
      setFields(internationalFields)
    }
  }, [kind])

  return (
    <div className=" w-full overflow-hidden h-screen pb-40">
      <div className="flex-1 h-full pb-32 overflow-y-auto scrollbar-hidden">
        <div className="border border-gray-200 overflow-hidden rounded-xl m-3 mb-10">
          <table className="w-full text-base min-w-[600px] sm:min-w-[800px] lg:min-w-[1000px] ">

            <thead className="">
              <tr className="bg-[#F6D6EC] text-primaryColor">
                {
                  fields?.map((item, index) => (
                    <th key={index} className="pl-5 text-start py-3 font-normal max-md:text-sm border">
                      {item?.label}
                    </th>
                  ))
                }
                <th className="pl-5 text-start py-3 font-normal max-md:text-sm border">
                  Date
                </th>

              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item?.id} className=" border-gray-400 bg-white capitalize">

                  {
                    fields?.map((elem, index) => (
                      <td key={index} className="pl-5 p-3 text-left border">{item?.[elem?.key]}</td>
                    ))
                  }

                  <td className="pl-5 p-3 text-left border">{item?.createdAt && new Date(item?.createdAt)?.toLocaleDateString('en-IN')}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnquiryTable
