'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from './icons/DownloadIcon';

export type PDFDownloaderDef = {
  name?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
};

const PDFDownloader = ({
  children,
  trigger,
  name = 'example',
}: PDFDownloaderDef) => {
  const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );

  const MyDocument = () => {
    return <>{children}</>;
  };

  return (
    <PDFDownloadLink document={<MyDocument />} fileName={`${name}.pdf`}>
      {({ blob, url, loading, error }) => {
        return trigger ? (
          trigger
        ) : (
          <Button variant={'secondary'}>
            {loading ? (
              'Document...'
            ) : (
              <>
                <DownloadIcon /> PDF Download
              </>
            )}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PDFDownloader;
