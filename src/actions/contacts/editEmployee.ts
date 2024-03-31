'use server';

import { authApi } from '@/lib/api';
import { IUserRequest } from '@/types/contact/partyRequest';

export const editEmployee = async ({ id, ...payload }: IUserRequest) => {
  try {
    const res = await authApi.put(`/employees/${id}`, payload);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        status: data?.code,
        data: data as IUserRequest,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};
