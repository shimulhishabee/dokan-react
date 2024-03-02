
'use client'
import React from 'react'
import { useState } from "react";
import { useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useCountdown } from 'usehooks-ts';
import { Text } from '@/components/common/text'


const OTPVerify = () => {
    const [otp, setOtp] = useState<string>('');
    const [inValidOtp, setInValidOtp] = useState<boolean>(false);
    const [disableResentOtpButton, setDisableResetOtpButton] = useState<boolean>(true);

    const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({ countStart: 59, intervalMs: 1000 });


    const handleOtpReset = () => {
        resetCountdown();
    };

    useEffect(() => {
        if (count === 0) {
            setDisableResetOtpButton(false);
        }
    }, [count]);

    return (
        <div>
            <Text title='Verify your Phone number' className='text-[2.8rem] font-semibold mb-space16' />
            <Text title='A 6 digit OTP number has been sent to your phone Number' variant='secondary' className='mb-space32' />

            <div className="space-y-space8">
                <Text title='Enter OTP Number' />

                <OtpInput
                    value={otp}
                    numInputs={6}
                    inputType="number"
                    shouldAutoFocus={true}
                    onChange={(e) => setOtp(e)}
                    renderInput={(props) => <input {...props} placeholder="-" />}
                    containerStyle={{ justifyContent: 'space-between', gap: '1rem' }}
                    inputStyle={{
                        width: '48.38px',
                        height: '48.38px',
                        padding: '8px 8px',
                        border: inValidOtp
                            ? '1px solid #FF3B30'
                            : '1px solid #CCCCCC',
                        outline: 'none',
                        borderRadius: '8px',
                        color: inValidOtp ? '#FF3B30' : '#333',
                    }}
                />
            </div>

            <div className="flex justify-between mt-space24">
                {inValidOtp ? (
                    <div className="flex justify-between w-full">
                        <button
                            type="button"
                            onClick={handleOtpReset}
                            disabled={disableResentOtpButton}
                            className="text-sm text-primary-400 hover:text-primary-500 disabled:text-primary-20"
                        >
                            Resend code
                        </button>
                        <Text variant='error' title='The OTP code is not correct' className='text-sm' />
                    </div>
                ) : (
                    <div className="flex justify-between w-full">
                        <button
                            onClick={handleOtpReset}
                            disabled={disableResentOtpButton}
                            className="text-sm text-primary-400 hover:text-primary-500 disabled:text-primary-20"
                        >
                            {disableResentOtpButton ? 'Please wait...' : 'Resend code'}
                        </button>
                        <Text title={`00.${count}s`} className='text-sm' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default OTPVerify