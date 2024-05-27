'use client';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { StatefulPinInput } from 'react-input-pin-code';
import { authenticate } from '@/actions/auth';
import { signIn } from '@/auth';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';
import { PasswordInput } from '@/components/password-input';
import { toast } from 'sonner';

// import { EyeIcon } from 'lucide-react';

const GivePin = ({ mobile_number }: { mobile_number: string }) => {
  const router = useRouter();
  const [showPin, setShowPin] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState<string>('');

  const login = async () => {
    setLoading(true);

    const res = await authenticate(undefined, { mobile_number, pin });
    console.log(res);
    if (res === 'Something went wrong.') {
      toast.error('You phone or pin is incorrect');
    }
    setLoading(false);
  };

  return (
    <div>
      <Text
        title="Welcome Back to Hishabee!"
        className="text-[2.8rem] font-semibold mb-space16"
      />

      <div className="space-y-space8 mb-space24">
        <Text title="Enter PIN Number" />

        <div className="relative">
          <PasswordInput
            id="current_password"
            value={pin}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const result = e.target?.value.replace(/\D/g, '');
              setPin(result);
            }}
            autoComplete="current-password"
          />
          {/* <StatefulPinInput
            length={5}
            placeholder="-"
            autoFocus={true}
            showState={false}
            initialValue={pin}
            mask={!showPin}
            containerStyle={{ maxWidth: '416px', gap: '1rem' }}
            onChange={(value, index, values) => setPin(values.join(''))}
            inputClassName="focus:!shadow-none !border-t-0 !border-x-0 !rounded-none !w-[4rem] md:!w-[5.4rem] lg:!w-[4rem] xl:!w-[5.4rem]"
            inputStyle={{
              color: '#333',
              outline: 'none',
              fontSize: '2.4rem',
              fontWeight: 'bold',
              padding: '24px 8px',
              borderBottom: '2px solid #CCCCCC',
            }}
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2 text-primary-400"
          >
            {showPin ? (
              <Icon icon="streamline:visible" width={29} height={30} />
            ) : (
              <Icon
                icon="ant-design:eye-invisible-twotone"
                width={29}
                height={30}
              />
            )}
          </button> */}
        </div>
      </div>

      <Button onClick={login} className="w-full">
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Confirm
      </Button>
      {/* <Button className="w-full" variant={'transparent'}>
        Forgot pin?
      </Button> */}
    </div>
  );
};

export default GivePin;

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
