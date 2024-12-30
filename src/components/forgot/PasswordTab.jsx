import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { setPasswordRoute } from '../../utils/Endpoint'
import axios from '../../axios-folder/axios';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { BeatLoader } from 'react-spinners'


const PasswordTab = ({ data, changeHandler, onClose }) => {
    const [loading, setLoading] = useState(false)

    const [cpassword, setCPassword] = useState("");

    const [p1Type, setP1Type] = useState('password')
    const [p2Type, setP2Type] = useState('password')

    const handleSetPassword = async () => {
        try {
            if (!data?.password?.trim()) {
                return toast.info('Enter Password')
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(data?.password)) {
                return toast.info(`Password should have atleast 1 uppercase letter, 
                    1 number and 1 special character`)
            }

            if (cpassword !== data?.password) {
                return toast.info(`Passwords doesn't match`)
            }

            setLoading(true)

            const res = await axios.post(setPasswordRoute, data)

            if (res.status === 200) {
                toast.success('Password Changed')
                onClose()
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to change password')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center gap-4'>
            <div className='w-full flex flex-col '>
                <label
                    className="block text-gray-500 text-sm font-bold mb-2 text-left"
                    htmlFor="password"
                >
                    Password
                </label>

                <div className='w-full h-full flex items-center gap-4'>
                    <input
                        className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type={p1Type}
                        placeholder="Enter password"
                        name='password'
                        value={data?.password}
                        onChange={changeHandler}
                    />

                    {
                        p1Type === 'password'
                            ?
                            <IoEyeOutline
                                size={24} className='cursor-pointer'
                                onClick={() => setP1Type('text')}
                            />
                            :
                            <IoEyeOffOutline
                                size={24} className='cursor-pointer'
                                onClick={() => setP1Type('password')}
                            />
                    }

                </div>
            </div>

            <div className='w-full flex flex-col '>
                <label
                    className="block text-gray-500 text-sm font-bold mb-2 text-left"
                    htmlFor="cpassword"
                >
                    Re-enter Password
                </label>

                <div className='w-full h-full flex items-center gap-4'>
                    <input
                        className="shadow appearance-none border border-gray-500 rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        id="cpassword"
                        type={p2Type}
                        placeholder="Enter password"
                        name='cpassword'
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                    />

                    {
                        p2Type === 'password'
                            ?
                            <IoEyeOutline
                                size={24} className='cursor-pointer'
                                onClick={() => setP2Type('text')}
                            />
                            :
                            <IoEyeOffOutline
                                size={24} className='cursor-pointer'
                                onClick={() => setP2Type('password')}
                            />
                    }

                </div>

            </div>

            <button
                onClick={handleSetPassword}
                className='w-full sm:w-1/2 p-2 mt-4 rounded-lg bg-primaryColor
                 text-white flex items-center justify-center '>
                {
                    loading
                        ?
                        <BeatLoader color='white' size={14} />
                        :
                        `Set Password`
                }
            </button>
        </div>
    )
}

export default PasswordTab