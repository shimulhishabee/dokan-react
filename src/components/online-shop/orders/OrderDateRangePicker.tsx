'use client';

import React from 'react';
import { DatePickerWithRange } from '@/components/common/DatePickerWithRange';
import { useOrdersStore } from '@/stores/useOrdersStore';
import { useOrdersTable } from '@/hooks/useOrdersTable';

const OrderDateRangePicker = () => {
  const { queryParams, setQueryParams } = useOrdersStore();
  const { updateQueryParams } = useOrdersTable();

  const selectedDateRange = {
    from: queryParams.start_date,
    to: queryParams.end_date,
  };

  return (
    <DatePickerWithRange
      dateRange={selectedDateRange}
      onChange={(range) => {
        updateQueryParams({
          ...queryParams,
          start_date: range?.from
            ? range.from.toISOString().split('T')[0]
            : undefined,
          end_date: range?.to
            ? range.to.toISOString().split('T')[0]
            : undefined,
        });
      }}
    />
  );
};

export default OrderDateRangePicker;