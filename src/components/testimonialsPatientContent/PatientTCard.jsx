import React, { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { testimonialAdminRoute } from '../../utils/Endpoint';

const PatientTCard = ({ data }) => {
    const [cardData, setCardData] = useState(data);

    const axiosPrivateHook = useAxiosPrivate();

    const updateStatus = async (status) => {
        try {
            const res = await axiosPrivateHook.put(`${testimonialAdminRoute}/${data?._id}`,
                { published: status }
            )

            if (res.status === 200) {
                setCardData((prev) => ({ ...prev, published: status }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-6 border rounded-3xl bg-white text-center pr-10 ">
            <h2 className="text-md mb-2 text-left text-[#424242] pl-6">{cardData?.name}</h2>
            <p className="text-md mb-4 text-left pl-6 text-[#424242]">
                {cardData?.content}
            </p>
            <div className="flex flex-row pl-6">

                <button
                    onClick={() => cardData?.published ? updateStatus(false) : updateStatus(true) }
                    className="bg-[#F6D6EC] text-primaryColor text-sm p-2 mr-8 rounded-md">
                    {cardData?.published ? 'Unpublish' : 'Publish'}
                </button>

                {/* <span className="text-sm p-2 text-[#424242]">Reject</span> */}
            </div>
        </div>
    )
}

export default PatientTCard