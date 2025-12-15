"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import Navbar from "../components/Navbar";

// Dynamically import the Spreadsheet component to avoid SSR issues with jspreadsheet
const Spreadsheet = dynamic(() => import("../components/Spreadsheet"), {
    ssr: false,
    loading: () => <p className="p-4 text-[var(--muted)]">Loading spreadsheet...</p>,
});

export default function ProcessSheet() {
    const options = useMemo(() => {
        const data = [
            ["PRESS", "1", "MASTER PLAN", "NO PLAN", "0.98", "19,185", "25,800", "25,800", "23,700", "25,800", "26,040", "20,760", "20,840"],
            ["PBSINS", "1", "MASTER PLAN", "NO PLAN", "1.00", "", "19,185", "25,284", "25,284", "25,284", "25,284", "21,168"],
            ["AN", "1", "MASTER PLAN", "PLAN", "1.00", "19,185", "19,000", "23,226", "23,226", "23,226", "19,639"],
            ["PRODUCTION PLAN", "", "TLS", "", "", "", "19,000", "20,000", "20,000", "20,000", "20,000"],
            ["BALANCE AND DIFFERENCE", "", "", "", "", "185", "5,469", "10,753", "13,979", "19,263", "18,902"],
            ["TLS", "0", "MASTER PLAN", "NO PLAN", "1.00", "250", "13,107", "18,810", "19,800", "19,800", "19,800"],
            ["OKP1", "1", "MASTER PLAN", "PLAN", "0.99", "1,098", "13,107", "18,810", "19,800", "19,800", "19,800"],
            ["PRODUCTION PLAN", "1", "1GC", "", "", "12,990", "13,107", "18,810", "19,800", "19,800", "19,800"],
        ];

        return {
            worksheets: [{
                data,
                columns: [
                    { type: "text", title: "OPERATION ORDER", width: 150, readOnly: true },
                    { type: "text", title: "LT", width: 50, readOnly: true },
                    { type: "text", title: "PLAN STYLE", width: 100, readOnly: true },
                    { type: "text", title: "PLAN STATUS", width: 100 },
                    { type: "text", title: "BUDOMARI", width: 80, readOnly: true },
                    { type: "text", title: "CURRENT STOCK", width: 100, readOnly: true },
                    { type: "numeric", title: "20-Nov-25", width: 80, mask: "#,##0", readOnly: true },
                    { type: "numeric", title: "21-Nov-25", width: 80, mask: "#,##0", readOnly: true },
                    { type: "numeric", title: "22-Nov-25", width: 80, mask: "#,##0", readOnly: true },
                    { type: "numeric", title: "23-Nov-25", width: 80, mask: "#,##0", readOnly: true },
                    { type: "numeric", title: "24-Nov-25", width: 80, mask: "#,##0", readOnly: true },
                    { type: "numeric", title: "25-Nov-25", width: 80, mask: "#,##0", readOnly: true },
                    { type: "numeric", title: "26-Nov-25", width: 80, mask: "#,##0", readOnly: true },
                ],
                minDimensions: [13, 20],
                tableOverflow: true,
                tableWidth: "100%",
                defaultColWidth: 100,
                style: {
                    A1: "background-color: #f3f3f3; font-weight: bold;",
                    A4: "background-color: #e6f7ff; font-weight: bold; color: blue;",
                    A5: "background-color: #fff1f0; font-weight: bold; color: red;",
                },
            }],
            onload: function (spreadsheet: any) {
                const json = spreadsheet.worksheets[0].getData();
                // @ts-ignore
                json.forEach((row, rowIndex) => {
                    // Check if the row is NOT "PRODUCTION PLAN"
                    if (row[0] === "PRODUCTION PLAN") {
                        const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
                        columns.forEach((col) => {
                            const cellName = `${col}${rowIndex + 1}`;
                            // if (col === "A" || col === "B" || col === "C" || col === "D" || col === "E" || col === "F") {
                            //     spreadsheet.worksheets[0].setReadOnly(cellName, true);
                            // } else {

                            // }
                            spreadsheet.worksheets[0].setReadOnly(cellName, false);
                            spreadsheet.worksheets[0].setStyle(cellName, 'background-color', '#c6acf3ff');
                            //spreadsheet.worksheets[0].setStyle(cellName, 'color', '#888');
                        });
                    }
                });
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
            <Navbar />

            <main className="flex-grow p-4 md:p-8">
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--foreground)] mb-4">
                        Process Sheet
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded uppercase">
                            Hide & Unhide
                        </button>
                        <button className="px-4 py-2 bg-gray-600 text-white text-xs font-bold rounded uppercase">
                            Calculation
                        </button>
                        <div className="flex-grow"></div>
                        <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded uppercase">
                            Calculation All Item
                        </button>
                        <button className="px-4 py-2 bg-gray-600 text-white text-xs font-bold rounded uppercase">
                            Form Refer Date Control
                        </button>
                        <button className="px-4 py-2 bg-gray-600 text-white text-xs font-bold rounded uppercase">
                            Plan & Budomari Recording
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden p-2">
                    <Spreadsheet options={options} />
                </div>
            </main>
        </div>
    );
}
