'use server';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';
// import { logger } from '../../Pino';

export const checkNumber = async ({
  mobile_number,
}: {
  mobile_number: string;
}) => {
  const res = await api.post(`/number_check?mobile_number=${mobile_number}`);
  cookies().set('mobile_number', mobile_number);

  const data = await res.json();
  if (res.ok) {
    return { success: true, status: data.code, data: data };
  }
  if (!res.ok) {
    cookies().set('mobile_number', mobile_number);
    return { success: false, error: data };
  }
};
