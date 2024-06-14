import { PageSubTitle } from '@/components/common/text';
import React from 'react';
import BODateRangePicker from '@/components/business-overview/BODateRangePicker';

export default function PageHeader() {
  return (
    <div className="flex items-cennter justify-between">
      <PageSubTitle title="Transaction Report" />
      <BODateRangePicker />
    </div>
  );
}