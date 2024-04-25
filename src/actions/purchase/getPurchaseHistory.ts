'use server';

import { authApi } from '@/lib/api';
import { cookies } from 'next/headers';
import { IDueListResponse } from '@/types/due/dueResponse';
import { IPurchaseHistoryResponse } from '@/types/purchase';
import { format, sub } from 'date-fns';
import { DATE_FORMATS } from '@/lib/constants/common';
import { formatDate } from '@/lib/utils';

export const getPurchaseHistory = async (
  page?: number,
  startDate?: string,
  endDate?: string
) => {
  const pageCount = page ? page : 1;
  console.log('sss');
  try {
    const shopId = cookies().get('shopId')?.value;
    const DEFAULT_PAGE_ITEMS = '10';

    // const params = `shop_id=${shopId}&per_page=${pageCount}`;
    const params = new URLSearchParams({
      shop_id: String(shopId),
      page: String(pageCount),
      start_date:
        startDate ??
        format(sub(new Date(), { days: 30 }), DATE_FORMATS.default),
      end_date: endDate ?? formatDate(DATE_FORMATS.default),
      per_page: DEFAULT_PAGE_ITEMS,
    });
    const res = await authApi.get(`/purchase?${params}`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        status_code: data.status_code,
        data: data.data as IPurchaseHistoryResponse[],
      };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  } catch {
    return { success: false, error: 'Something went wrong' };
  }
};