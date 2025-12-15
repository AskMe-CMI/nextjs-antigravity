/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

interface SpreadsheetProps {
    options: any;
}

export default function Spreadsheet({ options }: SpreadsheetProps) {
    const jRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!jRef.current) return;

        // Destroy existing instance if any (though typically this runs once on mount)
        jRef.current.innerHTML = "";

        jspreadsheet(jRef.current, options);
    }, [options]);

    return <div ref={jRef} />;
}
