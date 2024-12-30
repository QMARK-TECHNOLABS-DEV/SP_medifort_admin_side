import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { verifyOtpRoute } from '../../utils/Endpoint'
import axios from '../../axios-folder/axios'
import { BeatLoader } from 'react-spinners'


const OtpTab = ({ data, changeHandler, setTab }) => {
    const [loading, setLoading] = useState(false)

    const handleVerifyOtp = async () => {
        try {
            if (!data?.otp?.trim()) {
                return toast.info('Enter OTP')
            }

            setLoading(true)

            const res = await axios.post(verifyOtpRoute, {
                email: data?.email,
                otp: data?.otp
            })

            if (res.status === 200) {
                setTab(3)
                toast.success('OTP verified')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to verify OTP')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='w-full flex flex-col '>
                <label
                    className="block text-gray-500 text-sm font-bold mb-2 text-left"
                    htmlFor="otp"
                >
                    Enter OTP
                </label>
                <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                    id="otp"
                    type="text"
                    placeholder="Enter otp"
                    name='otp'
                    value={data?.otp}
                    onChange={changeHandler}
                />

            </div>

            <button
                onClick={handleVerifyOtp}
                className='w-full sm:w-1/2 p-2 mt-4 rounded-lg bg-primaryColor
                 text-white flex items-center justify-center '>

                {
                    loading
                        ?
                        <BeatLoader color='white' size={14} />
                        :
                        `Verify OTP`
                }
            </button>
        </div>
    )
}

export default OtpTab