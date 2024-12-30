import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import EmailTab from './EmailTab';
import OtpTab from './OtpTab';
import PasswordTab from './PasswordTab';

const ForgotModal = ({ onClose }) => {

    const [data, setData] = useState({
        email: '',
        otp: '',
        password: ''
    })

    const [tab, setTab] = useState(1)

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96 relative "
                onClick={(e) => e.stopPropagation()}
            >
                <IoMdCloseCircle
                    onClick={onClose}
                    color='red'
                    size={24}
                    className='absolute top-4 right-4'
                />

                <h2 className="text-lg font-semibold">Forgot password</h2>

                {
                    tab === 1
                    &&
                    <EmailTab data={data} changeHandler={changeHandler} setTab={setTab} />
                }

                {
                    tab === 2
                    &&
                    <OtpTab data={data} changeHandler={changeHandler} setTab={setTab} />
                }

                {
                    tab === 3
                    &&
                    <PasswordTab data={data} changeHandler={changeHandler} onClose={onClose} />
                }

            </div>
        </div>
    );
}

export default ForgotModal