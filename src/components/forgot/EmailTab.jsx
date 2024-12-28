import React, { useState } from 'react'
import axios from '../../axios-folder/axios'
import { sendOtpRoute } from '../../utils/Endpoint'
import { toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'

const EmailTab = ({ data, changeHandler, setTab }) => {
    const [loading, setLoading] = useState(false)

    const handleSendOtp = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data?.email)) {
                return toast.info("Enter a valid email id")
            }

            setLoading(true)
            const res = await axios.post(sendOtpRoute, { email: data?.email })

            if (res.status === 200) {
                setTab(2)
                toast.success('OTP sent to the email address')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to sent OTP')
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
                    htmlFor="email"
                >
                    Enter E-mail
                </label>
                <input
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Enter e-mail"
                    name='email'
                    value={data?.email}
                    onChange={changeHandler}
                />

            </div>

            <button
                onClick={handleSendOtp}
                className='w-full sm:w-1/2 p-2 mt-4 rounded-lg bg-primaryColor
                 text-white flex items-center justify-center '>
                {
                    loading
                        ?
                        <BeatLoader color='white' size={14} />
                        :
                        `Send OTP`
                }
            </button>
        </div>
    )
}

export default EmailTab