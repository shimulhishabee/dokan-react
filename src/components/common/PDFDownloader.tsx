'use client'
import React from 'react'
import dynamic from "next/dynamic";
import { Button } from '@/components/ui/button';

export type PDFDownloaderDef = {
    name?: string;
    children: React.ReactNode;
}


const PDFDownloader = ({ children, name = "example" }: PDFDownloaderDef) => {

    const PDFDownloadLink = dynamic(
        () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
        {
            ssr: false,
            loading: () => <p>Loading...</p>,
        },
    );

    const MyDocument = () => {
        return <>{children}</>
    }

    return (
        <PDFDownloadLink document={<MyDocument />} fileName={`${name}.pdf`}>
            {({ blob, url, loading, error }) => {

                return (
                    <Button>
                        {loading ? 'Document...' : 'Download PDF'}
                    </Button>
                )
            }}
        </PDFDownloadLink>
    )
}

export default PDFDownloader