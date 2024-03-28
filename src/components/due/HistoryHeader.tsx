'use client';
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { PageSubTitle } from '@/components/common/text';
import { usePathname, useRouter } from 'next/navigation';
import { FilterIcon, SortIcon } from '@/components/common/icons';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { DownloadIcon } from '@/components/common/icons/DownloadIcon';
import DateRangePicker, {
  DateRangeDef,
} from '@/components/common/DateRangePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PDFDownloader from '../common/PDFDownloader';
import { DueHistoryPDF } from '../pdf/DueHistoryPDF';
import { Quixote } from '../pdf/HistoryPDF';

const HistoryHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setQueryString } = useCreateQueryString();

  const handleDateRange = (date: DateRangeDef) => {
    if (date?.from) {
      const start_date = format(date.from, 'yyyy-MM-dd HH:mm:ss');
      router.replace(`${pathname}?${setQueryString('start_date', start_date)}`);
    }

    if (date?.to) {
      const end_date = format(date.to, 'yyyy-MM-dd HH:mm:ss');
      router.replace(`${pathname}?${setQueryString('end_date', end_date)}`);
    }
  };

  return (
    <div className="flex justify-between items-center flex-wrap gap-space16">
      <PageSubTitle title="Due History" />

      <div className="flex flex-wrap gap-space8 sm:gap-space12">
        {/* Need to be feature, not implemented yet because API is not ready, Mobile end Its working manually, but not implemented in the web end. Because Paginated problem */}
        {/* <Select onValueChange={handleSort} defaultValue={value}>
                    <SelectTrigger className="max-w-max h-[4.8rem] dark:border- border-color dark:bg-primary-90 gap-space8 dark:text-text400" >
                        <SortIcon />
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <div className="max-h-[24rem] overflow-y-scroll">
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </div>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleSort} defaultValue={value}>
                    <SelectTrigger className="max-w-max h-[4.8rem] dark:border- border-color dark:bg-primary-90 gap-space8 dark:text-text400" >
                        <FilterIcon />
                        <SelectValue placeholder="Filter By" />
                    </SelectTrigger>
                    <SelectContent>
                        <div className="max-h-[24rem] overflow-y-scroll">
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </div>
                    </SelectContent>
                </Select> */}

        <DateRangePicker
          onChange={(date) => handleDateRange(date)}
          triggerClasses="!h-[4.8rem]"
        />

        <PDFDownloader name="Due_history_pdf">
          <DueHistoryPDF />
        </PDFDownloader>

        <DueHistoryPDF />
      </div>
    </div>
  );
};

export default HistoryHeader;
