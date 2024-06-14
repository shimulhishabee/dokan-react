'use server';
import { ICommonGetResponse } from '@/types/common';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { format, sub } from 'date-fns';
import { DATE_FORMATS } from '@/lib/constants/common';
import { formatDate } from '@/lib/utils';
import { IIncomeReportsResponse } from '@/types/incomeReport';

export const getIncomeReport = async (startDate?: string, endDate?: string) => {
  try {
    const shopId = cookies().get('shopId')?.value;

    const params = new URLSearchParams({
      shop_id: String(shopId),
      start_date:
        startDate ??
        format(sub(new Date(), { days: 30 }), DATE_FORMATS.default),
      end_date: endDate ?? formatDate(DATE_FORMATS.default),
      exclude_deleted: 'true',
    });
    const res = await authApi.get(`/overview/income?${params}`);
    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
        data: data as ICommonGetResponse<IIncomeReportsResponse>,
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};